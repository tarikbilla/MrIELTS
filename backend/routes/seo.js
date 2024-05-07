const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ensure this is your configured MySQL connection

// Fetch SEO data
router.get('/:postID/:postType', async (req, res) => {
    const { postID, postType } = req.params;
    try {
        const query = 'SELECT * FROM seo_data WHERE post_id = ? AND post_type = ?';
        const [results] = await pool.execute(query, [postID, postType]);

        if (results.length === 0) {
            res.status(404).json({ error: 'SEO data not found' });
        } else {
            res.status(200).json(results[0]); // Return the first result
        }
    } catch (error) {
        console.error('Error fetching SEO data:', error);
        res.status(500).send('Error fetching SEO data');
    }
});

// Add new SEO data
router.post('/', async (req, res) => {
    const { post_id, post_type, title, meta_description, keywords } = req.body;
    try {
        const insertQuery = 'INSERT INTO seo_data (post_id, post_type, title, meta_description, keywords) VALUES (?, ?, ?, ?, ?)';
        const [results] = await pool.execute(insertQuery, [post_id, post_type, title, meta_description, keywords]);
        
        res.status(201).json({ message: 'SEO data added successfully', data: results });
    } catch (error) {
        console.error('Error adding SEO data:', error);
        res.status(500).send('Error adding SEO data');
    }
});

// Update existing SEO data
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, meta_description, keywords } = req.body;
    try {
        const updateQuery = 'UPDATE seo_data SET title = ?, meta_description = ?, keywords = ? WHERE id = ?';
        const updateValues = [title, meta_description, keywords, id];
        
        await pool.execute(updateQuery, updateValues);
        res.status(200).json({ message: 'SEO data updated successfully' });
    } catch (error) {
        console.error('Error updating SEO data:', error);
        res.status(500).send('Error updating SEO data');
    }
});

module.exports = router;
