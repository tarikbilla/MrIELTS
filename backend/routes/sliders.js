const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer'); // Import the multer configuration
const fs = require('fs');


const upload = createMulter('uploads/sliders/'); // send upload path

// add a new slider
router.post('/', upload.single('sliderImage'), async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
	
	const { sliderName, sliderDescription, sliderWebsite, sliderStatus, createdByUserID } = req.body;
	const newSliderImage = req.file ? `${year}/${month}/${req.file.filename}` : '';

	try {
		// SQL query
		const query = `INSERT INTO sliders (slider_name, slider_description, slider_link_url, slider_status, slider_image_url, created_by_user_id) VALUES (?, ?, ?, ?, ?, ?)`;
		const values = [sliderName, sliderDescription, sliderWebsite, sliderStatus, newSliderImage, createdByUserID];
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query, values);
		res.status(201).json({ message: 'slider added successfully', insertId: results.insertId });
	} catch (error) {
		console.error('Error adding slider:', error);

		if (newSliderImage) {
            const filePath = `uploads/sliders/${newSliderImage}`;
            fs.unlinkSync(filePath); // Delete the uploaded file if an error occurred
        }

		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			// Handle other errors
			res.status(500).json({ error: 'An error occurred while adding the slider' });
		}
	}
});
module.exports = router;


// Get slider data by ID
router.get('/s/:id', async (req, res) => {
	const sliderId = req.params.id;
	try {
		// Your SQL query to select a slider by ID
		const query = 'SELECT * FROM sliders WHERE slider_id = ?';
		const [results] = await pool.execute(query, [sliderId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'slider not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving slider data:', error);
		res.status(500).json({ error: 'An error occurred while fetching slider data' });
	}
});


// Define a route to get all slider data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all slider data
		const query = 'SELECT * FROM sliders';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the slider data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving slider data:', error);
		res.status(500).json({ error: 'An error occurred while fetching slider data' });
	}
});


// Update a slider by ID
router.put('/:id', upload.single('sliderImage'), async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
	
	const sliderId = req.params.id;
	const { sliderName, sliderDescription, sliderWebsite, sliderStatus, sliderImage } = req.body;
	const newSliderImage = req.file ? `${year}/${month}/${req.file.filename}` : sliderImage;
	try {
		// Check if the slider with the given ID exists
		const [checkResult] = await pool.execute('SELECT slider_id FROM sliders WHERE slider_id = ?', [sliderId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'slider not found' });
		}
		// Your SQL query to update the slider
		const updateQuery = `
      UPDATE sliders
      SET slider_name = ?, slider_description = ?, slider_link_url = ?, slider_status = ?, slider_image_url = ?
      WHERE slider_id = ?
    `;
		const updateValues = [sliderName, sliderDescription, sliderWebsite, sliderStatus, newSliderImage, sliderId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'slider updated successfully' });
	} catch (error) {
		console.error('Error updating slider:', error);
		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the slider' });
		}
	}
});
module.exports = router;


// Define a route to delete a slider by ID
router.delete('/:id', async (req, res) => {
	const sliderId = req.params.id;
	try {
		// Check if the slider with the given ID exists
		const [checkResult] = await pool.execute('SELECT slider_id, slider_image_url FROM sliders WHERE slider_id = ?', [sliderId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'slider not found' });
		}
		// Your SQL query to delete the slider
		const deleteQuery = 'DELETE FROM sliders WHERE slider_id = ?';
		await pool.execute(deleteQuery, [sliderId]);

		 // If there's a store logo associated with the store, delete the file
		 if (checkResult[0].slider_image_url) {
			const filePath = `uploads/sliders/${checkResult[0].slider_image_url}`;
			fs.unlinkSync(filePath); // Remove the file synchronously
		  }
		res.status(200).json({ message: 'slider deleted successfully' });
	} catch (error) {
		console.error('Error deleting slider:', error);
		res.status(500).json({ error: 'An error occurred while deleting the slider' });
	}
});



// Define a route to get all slider data
router.get('/published', async (req, res) => {
	try {
		// Your SQL query to select all slider data
		const query = `SELECT * FROM sliders WHERE slider_status = 'publish'`;
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the slider data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving slider data:', error);
		res.status(500).json({ error: 'An error occurred while fetching slider data' });
	}
});
