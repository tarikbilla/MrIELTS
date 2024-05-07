const express = require('express');
const router = express.Router();
const pool = require('../db');
const createMulter = require('../config/multer');
const bcrypt = require('bcrypt'); // Import bcrypt
const fs = require('fs');

const upload = createMulter('uploads/users/');

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config'); // Assuming you have a jwtSecret in your config

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const [user] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);

		if (!user || !user.length) {
			return res.status(401).json({ error: 'Invalid username credentials' });
		}

		const isPasswordMatch = await bcrypt.compare(password, user[0].password);
		if (!isPasswordMatch) {
			return res.status(401).json({ error: 'Invalid password credentials' });
		}

		const token = jwt.sign({ userId: user[0].user_id, username: user[0].username }, jwtSecret, {
			expiresIn: '365d', // Token expiration time
		});

		res.status(200).json({ token });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ error: 'An error occurred during login' });
	}
});


router.post('/', upload.single('profilePicture'), async (req, res) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');

	const { fullName, username, userEmail, userPassword, userRole, createByUserID } = req.body;
	const profilePicture = req.file ? `${year}/${month}/${req.file.filename}` : null;

	try {
		// Hash the password before storing it in the database
		const hashedPassword = await bcrypt.hash(userPassword, 10);

		const query = `
      INSERT INTO users (full_name, username, email, password, user_role, created_by_user_id, user_avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
		const values = [fullName, username, userEmail, hashedPassword, userRole, createByUserID, profilePicture];
		const [results] = await pool.execute(query, values);
		res.status(201).json({ message: 'User added successfully', insertId: results.insertId });
	} catch (error) {
		console.error('Error adding user:', error);
		if (profilePicture) {
            const filePath = `uploads/users/${profilePicture}`;
            fs.unlinkSync(filePath); // Delete the uploaded file if an error occurred
        }
		if (error.code === 'ER_DUP_ENTRY') {
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while adding the user' });
		}
	}
});

// Get user data by ID
router.get('/u/:id', async (req, res) => {
	const userId = req.params.id;
	try {
		// Your SQL query to select a user by ID
		const query = 'SELECT `user_id`, `username`, `email`, `full_name`, `user_role`, `user_registered_date`, `user_avatar`, `user_bio`, `created_by_user_id` FROM users WHERE user_id = ?';
		const [results] = await pool.execute(query, [userId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'user not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving user data:', error);
		res.status(500).json({ error: 'An error occurred while fetching user data' });
	}
});


// Define a route to get all users data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all users data
		const query = 'SELECT `user_id`, `username`, `email`, `full_name`, `user_role`, `user_registered_date`, `user_avatar`, `user_bio`, `created_by_user_id` FROM users';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the users data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving users data:', error);
		res.status(500).json({ error: 'An error occurred while fetching users data' });
	}
});


// Define a route to get the user's profile data
router.get('/me', async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1]; // Extract token from the Authorization header
		const decodedToken = jwt.verify(token, jwtSecret);

		const [user] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [decodedToken.userId]);

		if (!user || !user.length) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userProfile = {
			userId: user[0].user_id,
			username: user[0].username,
			email: user[0].email,
			user_avatar: user[0].user_avatar,
			// Add other user profile fields as needed
		};

		res.status(200).json(userProfile);
	} catch (error) {
		console.error('Error fetching user profile:', error);
		res.status(500).json({ error: 'An error occurred while fetching user profile' });
	}
});



// Update a users by ID
router.put('/:id', upload.single('profilePicture'), async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

	const userId = req.params.id;
	const { fullName, username, userEmail, userRole, profilePicture } = req.body;
	const newUsersLogo = req.file ? `${year}/${month}/${req.file.filename}` : profilePicture;
	try {
		// Check if the users with the given ID exists
		const [checkResult] = await pool.execute('SELECT user_id FROM users WHERE user_id = ?', [userId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'users not found' });
		}
		// Your SQL query to update the users
		const updateQuery = `
      UPDATE users SET full_name = ?, username = ?, email = ?, user_role = ?, user_avatar = ? WHERE user_id = ?
    `;
		const updateValues = [fullName, username, userEmail, userRole, newUsersLogo, userId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'users updated successfully' });
	} catch (error) {
		console.error('Error updating users:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the users' });
		}
	}
});



// Update a users by ID
router.put('/password/:id', upload.none(), async (req, res) => {
	const userId = req.params.id;
	const { userPassword } = req.body;
	try {
		// Hash the password before storing it in the database
		const hashedPassword = await bcrypt.hash(userPassword, 10);

		// Check if the users with the given ID exists
		const [checkResult] = await pool.execute('SELECT user_id FROM users WHERE user_id = ?', [userId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'users not found' });
		}
		// Your SQL query to update the users
		const updateQuery = `
      UPDATE users SET  password = ? WHERE user_id = ?
    `;
		const updateValues = [hashedPassword, userId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'Password update successfully' });
	} catch (error) {
		console.error('Error updating password:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the users password' });
		}
	}
});
module.exports = router;




// Define a route to delete a user by ID
router.delete('/:id', async (req, res) => {
	const userId = req.params.id;
  
	try {
	  const [checkResult] = await pool.execute('SELECT user_id, user_avatar FROM users WHERE user_id = ?', [userId]);
	  if (checkResult.length === 0) {
		return res.status(404).json({ error: 'user not found' });
	  }
  
	  const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
	  await pool.execute(deleteQuery, [userId]);
  
	  // If there's a user logo associated with the user, delete the file
	  if (checkResult[0].user_avatar) {
		const filePath = `uploads/users/${checkResult[0].user_avatar}`;
		fs.unlinkSync(filePath); // Remove the file synchronously
	  }
  
	  res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
	  console.error('Error deleting user:', error);
	  res.status(500).json({ error: 'An error occurred while deleting the user' });
	}
  });
  
  module.exports = router;

