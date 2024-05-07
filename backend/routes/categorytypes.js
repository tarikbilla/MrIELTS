const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer'); // Import the multer configuration


const upload = createMulter('uploads/category-types/'); // send upload path

// add a new category type
router.post('/', upload.none(), async (req, res) => {
	const { catTypeName, catTypeDescription, catTypeSlug, createdByUserID } = req.body;
	try {
		// SQL query
		const query = `
      INSERT INTO category_types (cat_types_name, cat_types_description, cat_types_slug, created_by_user_id)
      VALUES (?, ?, ?, ?)
    `;
		const values = [catTypeName, catTypeDescription, catTypeSlug, createdByUserID];
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query, values);
		res.status(201).json({ message: 'Category Type added successfully', insertId: results.insertId });
	} catch (error) {
		console.error('Error adding catType:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			// Handle other errors
			res.status(500).json({ error: 'An error occurred while adding the Category Type' });
		}
	}
});
module.exports = router;



// Get Category Type data by ID
router.get('/:id', async (req, res) => {
	const catTypeId = req.params.id;
	try {
		// Your SQL query to select a Category Type by ID
		const query = 'SELECT * FROM category_types WHERE cat_types_id = ?';
		const [results] = await pool.execute(query, [catTypeId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Category Type not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving Category Type data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category type data' });
	}
});



// Define a route to get all catType data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all catType data
		const query = 'SELECT * FROM category_types';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the catType data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving Category Type data:', error);
		res.status(500).json({ error: 'An error occurred while fetching Category Type data' });
	}
});
module.exports = router;


// Update a catType by ID
router.put('/:id', upload.none(),  async (req, res) => {
	const catTypeId = req.params.id;
	const { catTypeName, catTypeDescription, catTypeSlug } = req.body;
	try {
		// Check if the catType with the given ID exists
		const [checkResult] = await pool.execute('SELECT cat_types_id FROM category_types WHERE cat_types_id = ?', [catTypeId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'category type not found' });
		}
		// Your SQL query to update the catType
		const updateQuery = `
      UPDATE category_types
      SET cat_types_name = ?, cat_types_description = ?, cat_types_slug = ? WHERE cat_types_id = ?
    `;
		const updateValues = [catTypeName, catTypeDescription, catTypeSlug, catTypeId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'Categories types updated successfully' });
	} catch (error) {
		console.error('Error updating Categories types:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the Categories types' });
		}
	}
});
module.exports = router;


// Define a route to delete a catType by ID
router.delete('/:id', async (req, res) => {
	const catTypeId = req.params.id;
	try {
		// Check if the catType with the given ID exists
		const [checkResult] = await pool.execute('SELECT cat_types_id FROM category_types WHERE cat_types_id  = ?', [catTypeId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'category type not found' });
		}
		// Your SQL query to delete the catType
		const deleteQuery = 'DELETE FROM category_types WHERE cat_types_id  = ?';
		await pool.execute(deleteQuery, [catTypeId]);
		res.status(200).json({ message: 'category type deleted successfully' });
	} catch (error) {
		console.error('Error deleting catType:', error);
		res.status(500).json({ error: 'An error occurred while deleting the catType' });
	}
});
