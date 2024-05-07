// settings.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Your database module

// Endpoint to get a specific setting by name
router.get('/:settingName', async (req, res) => {
    const { settingName } = req.params;
    try {
        const query = 'SELECT * FROM settings WHERE setting_name = ?';
        const [results] = await pool.execute(query, [settingName]);

        if (results.length === 0) {
            res.status(404).json({ error: 'Product Not Found' });
        } else {
            res.status(200).json(results[0]); // Return the first result
        }
    } catch (error) {
        console.error('Error fetching setting:', error);
        res.status(500).send('Error fetching setting');
    }
});


// Endpoint to update a specific setting
router.put('/:settingName', async (req, res) => {
    const { settingName } = req.params;
    const { settingValue } = req.body;
    try {
        const updateQuery = 'UPDATE settings SET setting_value = ? WHERE setting_name = ?';
        const updateValues = [settingValue, settingName];

        // Execute the query using the promise-based API of mysql2
        await pool.execute(updateQuery, updateValues);
        res.status(200).json({ message: 'product updated successfully' });
    } catch (error) {
        console.error('Error updating setting:', error);
        res.status(500).send('Error updating setting');
    }
});

module.exports = router;
