// uploadImage.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
require('dotenv').config();

const filePath = '../uploads/media/posts';

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const dynamicPath = path.join(filePath, `${year}/${month}`);

// Set storage engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, dynamicPath),
    filename: function (req, file, cb) {
        if (!fs.existsSync(dynamicPath)) {
            fs.mkdirSync(dynamicPath, { recursive: true });
        }
        cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|webp|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('image');


router.post('/', (req, res) => {
    try {
        upload(req, res, (err) => {
            // Handling errors related to multer (e.g., file size limit)
            if (err) {
                return res.status(400).send({ message: err.message || 'An error occurred during the file upload.' });
            }
            if (!req.file) {
                return res.status(400).send({ message: 'No File Selected!' });
            }
            try {
                // Ensure this part does not throw an error
                const imageUrl = `${process.env.API_URL}/uploads/media/posts/${year}/${month}/${req.file.filename}`;
                res.json({
                    message: 'File uploaded successfully!',
                    url: imageUrl
                });
            } catch (error) {
                // Handle potential errors like environment variables not being set
                console.error('Error constructing image URL:', error);
                return res.status(500).send({ message: 'Server error constructing image URL' });
            }
        });
    } catch (error) {
        // Catch any unexpected errors
        console.error('Unexpected error during the upload process:', error);
        return res.status(500).send({ message: 'Unexpected server error during the upload process' });
    }
});



router.delete('/image/:filename', (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/media', filename);

    fs.unlink(filePath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Failed to delete the image." });
        }
        res.send({ message: "Image deleted successfully." });
    });
});

module.exports = router;
