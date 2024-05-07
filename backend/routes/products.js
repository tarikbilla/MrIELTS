const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer'); // Import the multer configuration
const fs = require('fs'); // Import the fs module for file operations

const upload = createMulter('uploads/products/'); // send upload path

// add a new product
router.post('/', upload.array('productImages', 5), async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
	
    const { category_id, store_id, c_title, c_features, c_description, c_brand, c_link, c_slug, c_price_btn_text, c_full_review_btn_text, c_offer, c_rating, c_badges, c_order_number, c_picked_by_people, c_created_by_user_id } = req.body;
    const productproductImg = req.files ? req.files.map((file) => `${year}/${month}/${file.filename}`) : [];
	

    try {
        // SQL query
        const query = `INSERT INTO products(category_id, store_id, c_title, c_features, c_description, c_brand, c_link, c_slug, c_price_btn_text, c_full_review_btn_text, c_offer, c_rating, c_badges, c_features_images, c_order_number, c_picked_by_people, c_created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [category_id, store_id, c_title, c_features, c_description, c_brand, c_link, c_slug, c_price_btn_text, c_full_review_btn_text, c_offer, c_rating, c_badges, productproductImg.join(','), c_order_number, c_picked_by_people, c_created_by_user_id];
        
        // Execute the query using the promise-based API of mysql2
        const [results] = await pool.execute(query, values);
        
        res.status(201).json({ message: 'product added successfully', insertId: results.insertId });
    } catch (error) {
        console.error('Error adding product:', error);

        // Delete the uploaded files if they exist
        if (productproductImg.length > 0) {
            const filePaths = productproductImg.map(fileName => `uploads/products/${fileName}`);
            filePaths.forEach(filePath => {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Delete the uploaded file
                }
            });
        }

        if (error.code === 'ER_DUP_ENTRY') {
            // Handle the specific error for duplicate entry
            res.status(500).json({ sqlMessage: error.sqlMessage });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'An error occurred while adding the product' });
        }
    }
});



// Get product data by ID
router.get('/c/:id', async (req, res) => {
	const productId = req.params.id;
	try {
		// Your SQL query to select a product by ID
		const query = 'SELECT * FROM products WHERE product_id = ?';
		const [results] = await pool.execute(query, [productId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Product Not Found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching product data' });
	}
});


// Get product data by ID
router.get('/s/:slug', async (req, res) => {
	const productSlug = req.params.slug;
	try {
		// Your SQL query to select a product by ID
		const query = 'SELECT products.*, stores.store_logo FROM products LEFT JOIN stores ON products.store_id = stores.store_id WHERE c_slug  = ?';
		const [results] = await pool.execute(query, [productSlug]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Product Not Found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving product data:', error);
		res.status(500).json({ error: 'An error occurred while fetching product data' });
	}
});



// Get products data by using categoryID
router.get('/category/:id', async (req, res) => {
	const productId = req.params.id;
	try {
		// Your SQL query to select a product by ID
		const query = `SELECT products.*, stores.store_logo FROM products LEFT JOIN stores ON products.store_id = stores.store_id WHERE category_id = ? ORDER BY c_order_number ASC`;
		const [results] = await pool.execute(query, [productId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Product Not Found' });
		} else {
			res.status(200).json(results); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving product data:', error);
		res.status(500).json({ error: 'An error occurred while fetching product data' });
	}
});


// Define a route to get all product data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all product data
		const query = 'SELECT products.*, stores.store_name, categories.cat_name FROM products LEFT JOIN stores ON products.store_id = stores.store_id LEFT JOIN categories ON products.category_id = categories.category_id ORDER BY product_id DESC;';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the product data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving product data:', error);
		res.status(500).json({ error: 'An error occurred while fetching product data' });
	}
});


// Function to handle image deletion
const deleteUploadedImages = (imageNames) => {
    if (!Array.isArray(imageNames)) return;

    const filePaths = imageNames.map(fileName => `uploads/products/${fileName}`);
    filePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the uploaded file
        }
    });
};

// Update a product by ID
router.put('/:id', upload.array('productImages', 5), async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

	
	const productId = req.params.id;
	const {
		category_id, store_id, c_title, c_features, c_description, c_brand, c_link, c_slug, c_price_btn_text, c_full_review_btn_text, c_offer, c_rating, c_badges, c_order_number, c_picked_by_people, existingImages,
	} = req.body;

	// Check if the product with the given ID exists
	const [checkResult] = await pool.execute('SELECT product_id FROM products WHERE product_id = ?', [productId]);
	if (checkResult.length === 0) {
		return res.status(404).json({ error: 'Product Not Found' });
	}

	// Handle image updates
	let productproductImg = existingImages;
	if (req.files && req.files.length > 0) {
		productproductImg = req.files.map((file) => `${year}/${month}/${file.filename}` ).join(',');
	}

	try {
		// Your SQL query to update the product
		const updateQuery = `
		UPDATE products SET
		  category_id = ?, store_id = ?, c_title = ?, c_features = ?, c_description = ?, c_brand = ?, c_link = ?, c_slug = ?, c_price_btn_text = ?, c_full_review_btn_text = ?, c_offer = ?, c_rating = ?, c_badges = ?, c_features_images = ?, c_order_number = ?, c_picked_by_people = ?
		WHERE product_id = ? 
	  `;

		// Determine the values to be updated based on whether new images are provided
		const updateValues = [
			category_id, store_id, c_title, c_features, c_description, c_brand, c_link, c_slug, c_price_btn_text, c_full_review_btn_text, c_offer, c_rating, c_badges, productproductImg || '', c_order_number, c_picked_by_people, productId,
		];

		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'product updated successfully' });
	} catch (error) {
		console.error('Error updating product:', error);

		deleteUploadedImages(productproductImg ? productproductImg.split(',') : []);

		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the product' });
		}
	}
});


// Function to delete image files from the server
const deleteImagesFromServer = (imageNames) => {
    if (!Array.isArray(imageNames)) return;

    const filePaths = imageNames.map(fileName => `uploads/products/${fileName}`);
    filePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the uploaded file
        }
    });
};

// Define a route to delete a product by ID
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        // Fetch the image filenames associated with the product
        const [imageResult] = await pool.execute('SELECT c_features_images FROM products WHERE product_id = ?', [productId]);
        const imageNames = imageResult.length > 0 ? imageResult[0].c_features_images.split(',') : [];

        // Delete the product from the database
        const [checkResult] = await pool.execute('SELECT product_id FROM products WHERE product_id = ?', [productId]);
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        const deleteQuery = 'DELETE FROM products WHERE product_id = ?';
        await pool.execute(deleteQuery, [productId]);

        // Delete associated images from the server
        deleteImagesFromServer(imageNames);

        res.status(200).json({ message: 'product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the products' });
    }
});


// count total products
router.get('/total/count', async (req, res) => {
	try {
		// Your SQL query to select all product data
		const query = 'SELECT count(product_id) as total FROM products';
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
