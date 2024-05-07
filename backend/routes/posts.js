const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer'); // Import the multer configuration
const upload = createMulter('uploads/posts/'); // send upload path
const fs = require('fs');


// Function to handle image upload
const handleImageUpload = (req, res, next) => {
	upload.single('postThumbnail')(req, res, (err) => {
		if (err) {
			console.error('Error uploading image:', err);
			return res.status(500).json({ error: 'An error occurred while uploading the image' });
		}
		next();
	});
};

// add a new post
router.post('/', handleImageUpload, async (req, res) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');

	const { postTitle, postDescription, postCategoryID, postSlug, createdByUserID } = req.body;
	const postThumbnail = req.file ? `${year}/${month}/${req.file.filename}` : '';
	try {
		// SQL query
		const query = `INSERT INTO posts (post_title, post_content, categoryID, post_slug, featured_image, authorID) VALUES (?, ?, ?, ?, ?, ?)`;
		const values = [postTitle, postDescription, postCategoryID, postSlug, postThumbnail, createdByUserID];
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query, values);
		res.status(201).json({ message: 'post added successfully', insertId: results.insertId });
	} catch (error) {
		console.error('Error adding post:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			// Handle other errors
			res.status(500).json({ error: 'An error occurred while adding the post' });
		}
	}
});



// Get post data by ID
router.get('/p/:id', async (req, res) => {
	const postId = req.params.id;
	try {
		// Your SQL query to select a post by ID
		const query = 'SELECT * FROM posts WHERE postID = ?';
		const [results] = await pool.execute(query, [postId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'post not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});


// Get post data by slug
router.get('/single/:slug', async (req, res) => {
	const postSlug = req.params.slug;
	try {
		// Your SQL query to select a post by ID
		const query = 'SELECT * FROM posts WHERE post_slug = ?';
		const [results] = await pool.execute(query, [postSlug]);
		if (results.length === 0) {
			res.status(404).json({ error: 'post not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});

// get all post in a single category
router.get('/category/:id', async (req, res) => {
	const categoryId = req.params.id;

	try {
		// Your SQL query to select a post by ID
		const postQuery = 'SELECT * FROM posts WHERE categoryID = ?'; // Changed the query variable name to avoid confusion
		const [results] = await pool.execute(postQuery, [categoryId]); // Passing categoryId instead of catResults
		if (results.length === 0) {
			res.status(404).json({ error: 'post not found for the given category' }); // Corrected the error message
		} else {
			res.status(200).json(results); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});


// Define a route to get all post data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all post data
		const query = 'SELECT * FROM posts';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the post data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});


// get all post data for Blog page
router.get('/blog', async (req, res) => {
	try {
		// Your SQL query to select all post data
		const query = 'SELECT * FROM posts ORDER BY postID DESC';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the post data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});


// get 12 post for home section
router.get('/home', async (req, res) => {
	try {
		// Your SQL query to select all post data
		const query = 'SELECT * FROM posts ORDER BY postID DESC LIMIT 6';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the post data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});


// Update a post by ID
router.put('/:id', handleImageUpload, async (req, res) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');

	const postId = req.params.id;
	const { postTitle, postDescription, postCategoryID, postSlug, postThumbnail } = req.body;
	const newPostThumbnail = req.file ? `${year}/${month}/${req.file.filename}` : postThumbnail;
	try {
		// Check if the post with the given ID exists
		const [checkResult] = await pool.execute('SELECT postID FROM posts WHERE postID = ?', [postId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'post not found' });
		}
		// Your SQL query to update the post
		const updateQuery = ` UPDATE posts SET post_title = ?, post_content = ?, categoryID = ?, post_slug = ?, featured_image = ?
      WHERE postID = ? `;
		const updateValues = [postTitle, postDescription, postCategoryID, postSlug, newPostThumbnail, postId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'Post updated successfully' });
	} catch (error) {
		console.error('Error updating post:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the post' });
		}
	}
});



// Define a route to delete a post by ID
router.delete('/:id', async (req, res) => {
	const postId = req.params.id;
	try {
		// Check if the post with the given ID exists
		const [checkResult] = await pool.execute('SELECT postID, featured_image FROM posts WHERE postID = ?', [postId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'post not found' });
		}
		// Your SQL query to delete the post
		const deleteQuery = 'DELETE FROM posts WHERE postID = ?';
		await pool.execute(deleteQuery, [postId]);

		// If there's a store logo associated with the store, delete the file
		if (checkResult[0].featured_image) {
			const filePath = `uploads/posts/${checkResult[0].featured_image}`;
			fs.unlinkSync(filePath); // Remove the file synchronously
		}

		res.status(200).json({ message: 'post deleted successfully' });
	} catch (error) {
		console.error('Error deleting post:', error);
		res.status(500).json({ error: 'An error occurred while deleting the post' });
	}
});


// Get related posts by category
router.get('/related/:categoryId/:postId', async (req, res) => {
	const category = req.params.categoryId;
	const postId = req.params.postId;

	try {
		// Your SQL query to select related posts based on category
		// Exclude the current post by ID
		const query = `
			SELECT * FROM posts 
			WHERE categoryID = ? AND postID != ?
			ORDER BY RAND() 
			LIMIT 5`; // Adjust the LIMIT as needed

		const [results] = await pool.execute(query, [category, postId]);

		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving related posts:', error);
		res.status(500).json({ error: 'An error occurred while fetching related posts' });
	}
});




// Get related posts by category
router.get('/latestpost/', async (req, res) => {
	const category = req.params.categoryId;
	const postId = req.params.postId;

	try {
		// Your SQL query to select related posts based on category
		// Exclude the current post by ID
		const query = `
			SELECT * FROM posts ORDER BY postID DESC LIMIT 5`; // Adjust the LIMIT as needed

		const [results] = await pool.execute(query);

		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving related posts:', error);
		res.status(500).json({ error: 'An error occurred while fetching related posts' });
	}
});



// Define a route to get related category data
router.get('/relatedcategory', async (req, res) => {
	try {
		// Your SQL query to select all post data
		const query = 'SELECT * FROM post_categories ORDER BY RAND() LIMIT 5';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the post data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});

// count total posts
router.get('/total/count', async (req, res) => {
	try {
		// Your SQL query to select all product data
		const query = 'SELECT count(postID) as total FROM posts';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the product data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving product data:', error);
		res.status(500).json({ error: 'An error occurred while fetching product data' });
	}
});



module.exports = router;