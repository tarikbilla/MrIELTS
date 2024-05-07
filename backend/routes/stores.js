const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer.js'); // Import the multer configuration
const fs = require('fs');

const upload = createMulter('uploads/stores/'); // send upload path

// add a new store
router.post('/', upload.single('storeLogo'), async (req, res) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');

	const { storeName, storeDescription, storeWebsite, storeSlug, createdByUserID } = req.body;
	const storeLogo = req.file ? `${year}/${month}/${req.file.filename}` : null; // Only assign if a file was uploaded

	try {
		// SQL query
		const query = `
      INSERT INTO stores (store_name, store_description, store_website, store_slug, store_logo, created_by_user_id)
      VALUES (?, ?, ?, ?, ?, ?)
        `;
		const values = [storeName, storeDescription, storeWebsite, storeSlug, storeLogo, createdByUserID];
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query, values);

		res.status(201).json({ message: 'Store added successfully', insertId: results.insertId });
	} catch (error) {
		console.error('Error adding store:', error);

		if (storeLogo) {
			const filePath = `uploads/stores/${storeLogo}`;
			fs.unlinkSync(filePath); // Delete the uploaded file if an error occurred
		}

		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			// Handle other errors
			res.status(500).json({ error: 'An error occurred while adding the store' });
		}
	}
});


// Get store data by ID
router.get('/:id', async (req, res) => {
	const storeId = req.params.id;
	try {
		// Your SQL query to select a store by ID
		const query = 'SELECT * FROM stores WHERE store_id = ?';
		const [results] = await pool.execute(query, [storeId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Store not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving store data:', error);
		res.status(500).json({ error: 'An error occurred while fetching store data' });
	}
});


// Define a route to get all store data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all store data
		const query = 'SELECT * FROM stores ORDER BY store_id DESC ';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the store data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving store data:', error);
		res.status(500).json({ error: 'An error occurred while fetching store data' });
	}
});
module.exports = router;


// Update a store by ID
router.put('/:id', upload.single('storeLogo'), async (req, res) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');

	const storeId = req.params.id;
	const { storeName, storeDescription, storeWebsite, storeSlug, storeLogo } = req.body;
	const newStoreLogo = req.file ? `${year}/${month}/${req.file.filename}` : storeLogo;
	try {
		// Check if the store with the given ID exists
		const [checkResult] = await pool.execute('SELECT store_id FROM stores WHERE store_id = ?', [storeId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'Store not found' });
		}
		// Your SQL query to update the store
		const updateQuery = `
      UPDATE stores
      SET store_name = ?, store_description = ?, store_website = ?, store_slug = ?, store_logo = ?
      WHERE store_id = ?
    `;
		const updateValues = [storeName, storeDescription, storeWebsite, storeSlug, newStoreLogo, storeId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'Store updated successfully' });
	} catch (error) {
		console.error('Error updating store:', error);

		if (newStoreLogo) {
			const filePath = `uploads/stores/${newStoreLogo}`;
			fs.unlinkSync(filePath); // Delete the uploaded file if an error occurred
		}

		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the store' });
		}
	}
});
module.exports = router;


// Define a route to delete a store by ID
router.delete('/:id', async (req, res) => {
	const storeId = req.params.id;

	try {
		const [checkResult] = await pool.execute('SELECT store_id, store_logo FROM stores WHERE store_id = ?', [storeId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'Store not found' });
		}

		const deleteQuery = 'DELETE FROM stores WHERE store_id = ?';
		await pool.execute(deleteQuery, [storeId]);

		// If there's a store logo associated with the store, delete the file
		if (checkResult[0].store_logo) {
			const filePath = `uploads/stores/${checkResult[0].store_logo}`;
			fs.unlinkSync(filePath); // Remove the file synchronously
		}

		res.status(200).json({ message: 'Store deleted successfully' });
	} catch (error) {
		console.error('Error deleting store:', error);
		res.status(500).json({ error: 'An error occurred while deleting the store' });
	}
});

// count total products
router.get('/total/count', async (req, res) => {
	try {
		// Your SQL query to select all product data
		const query = 'SELECT count(store_id) as total FROM stores';
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
