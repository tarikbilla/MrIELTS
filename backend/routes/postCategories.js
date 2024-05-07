const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer'); // Import the multer configuration


const upload = createMulter('uploads/category-types/'); // send upload path

// add a new category
router.post('/', upload.none(), async (req, res) => {
	const { postCatName, postCatDescription, postCatSlug, createdByUserID } = req.body;
	try {
		// SQL query
		const query = `
      INSERT INTO post_categories (post_cat_name, post_cat_description, post_cat_slug, created_by_user_id)
      VALUES (?, ?, ?, ?)
    `;
		const values = [postCatName, postCatDescription, postCatSlug, createdByUserID];
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query, values);
		res.status(201).json({ message: 'Category added successfully', insertId: results.insertId });
	} catch (error) {
		console.error('Error adding postCat:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			// Handle other errors
			res.status(500).json({ error: 'An error occurred while adding the Category' });
		}
	}
});




// Get Category data by ID
router.get('/c/:id', async (req, res) => {
	const categoryId = req.params.id;
	try {
		// Your SQL query to select a Category by ID
		const query = 'SELECT * FROM post_categories WHERE post_cat_id = ?';
		const [results] = await pool.execute(query, [categoryId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Category not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving Category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
});


// Get Category data by Slug
router.get('/cs/:slug', async (req, res) => {
	const categorySlug = req.params.slug;
	try {
		// Your SQL query to select a Category by ID
		const query = 'SELECT * FROM post_categories WHERE post_cat_slug = ?';
		const [results] = await pool.execute(query, [categorySlug]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Category not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving Category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
});



// Define a route to get all postCat data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all postCat data
		const query = 'SELECT * FROM post_categories';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the postCat data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving Category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching Category data' });
	}
});



// Update a postCat by ID
router.put('/:id', upload.none(), async (req, res) => {
	const categoryId = req.params.id;
	const { postCatName, postCatDescription, postCatSlug } = req.body;
	try {
		// Check if the postCat with the given ID exists
		const [checkResult] = await pool.execute('SELECT post_cat_id FROM post_categories WHERE post_cat_id = ?', [categoryId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'category not found' });
		}
		// Your SQL query to update the postCat
		const updateQuery = `
      UPDATE post_categories
      SET post_cat_name = ?, post_cat_description = ?, post_cat_slug = ? WHERE post_cat_id = ?
    `;
		const updateValues = [postCatName, postCatDescription, postCatSlug, categoryId];
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



// Define a route to delete a postCat by ID
router.delete('/:id', async (req, res) => {
	const categoryId = req.params.id;
	try {
		// Check if the postCat with the given ID exists
		const [checkResult] = await pool.execute('SELECT post_cat_id FROM post_categories WHERE post_cat_id  = ?', [categoryId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'category not found' });
		}
		// Your SQL query to delete the postCat
		const deleteQuery = 'DELETE FROM post_categories WHERE post_cat_id  = ?';
		await pool.execute(deleteQuery, [categoryId]);
		res.status(200).json({ message: 'category deleted successfully' });
	} catch (error) {
		console.error('Error deleting postCat:', error);
		res.status(500).json({ error: 'An error occurred while deleting the postCat' });
	}
});

module.exports = router;