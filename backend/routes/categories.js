const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import your connection pool
const createMulter = require('../config/multer.js'); // Import the multer configuration
const fs = require('fs');


const upload = createMulter('uploads/categories/'); // send upload path

// Function to handle image upload
const handleImageUpload = (req, res, next) => {
	upload.single('categoryLogo')(req, res, (err) => {
		if (err) {
			console.error('Error uploading image:', err);
			return res.status(500).json({ error: 'An error occurred while uploading the image' });
		}
		next();
	});
};

// add a new category
router.post('/', handleImageUpload, async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
	const { categoryName, categoryDescription, CategoryContents, categorySlug, catTypeID, parentCategoryID, categoryBrandsEvaluated, categoryTopicsConsidered, categoryHoursOfResearch, categoryPurchasesAnalyzed, createdByUserID, cat_status } = req.body;
	const categoryLogo = req.file ? `${year}/${month}/${req.file.filename}` : null;


	try {
		// SQL query
		const query = `INSERT INTO categories(cat_name, cat_description, cat_content, cat_slug, cat_type_ID, cat_parent_catID, cat_logo, cat_brands_evaluated, cat_topics_considered, cat_hours_of_research, cat_purchases_analyzed, cat_created_by_userID, cat_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		const values = [categoryName, categoryDescription, CategoryContents, categorySlug, catTypeID, parentCategoryID, categoryLogo, categoryBrandsEvaluated, categoryTopicsConsidered, categoryHoursOfResearch, categoryPurchasesAnalyzed, createdByUserID, cat_status];
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query, values);
        res.status(201).json({ message: 'category added successfully', insertId: results.insertId });
    } catch (error) {
        console.error('Error adding category:', error);

        if (categoryLogo) {
            const filePath = `uploads/categories/${categoryLogo}`;
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



// Get category data by ID
router.get('/c/:id', async (req, res) => {
	const categoryId = req.params.id;
	try {
		// Your SQL query to select a category by ID
		const query = 'SELECT * FROM categories WHERE category_id = ?';
		const [results] = await pool.execute(query, [categoryId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'category not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		console.error('Error retrieving category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
});



// Define a route to get all category data
router.get('/', async (req, res) => {
	try {
		// Your SQL query to select all category data
		const query = 'SELECT * FROM categories';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the category data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
});



// Update a category by ID
router.put('/:id', handleImageUpload, async (req, res) => {
	const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

	const categoryId = req.params.id;
	const { categoryName, categoryDescription, CategoryContents, categorySlug, catTypeID, parentCategoryID, categoryBrandsEvaluated, categoryTopicsConsidered, categoryHoursOfResearch, categoryPurchasesAnalyzed, categoryLogo, cat_status} = req.body;
	const newCategoryLogo = req.file ? `${year}/${month}/${req.file.filename}` : categoryLogo;
	try {
		// Check if the category with the given ID exists
		const [checkResult] = await pool.execute('SELECT category_id FROM categories WHERE category_id = ?', [categoryId]);
		if (checkResult.length === 0) {
			return res.status(404).json({ error: 'category not found' });
		}
		// Your SQL query to update the category
		const updateQuery = `
      UPDATE categories
      SET cat_name = ?, cat_description = ?, cat_content = ?, cat_slug = ?, cat_type_ID = ?, cat_parent_catID = ?, cat_logo = ?, cat_brands_evaluated = ?, cat_topics_considered = ?, cat_hours_of_research = ?, cat_purchases_analyzed = ?, cat_status = ?
      WHERE category_id = ?
    `;
		const updateValues = [categoryName, categoryDescription, CategoryContents, categorySlug, catTypeID, parentCategoryID, newCategoryLogo, categoryBrandsEvaluated, categoryTopicsConsidered, categoryHoursOfResearch, categoryPurchasesAnalyzed, cat_status, categoryId];
		// Execute the query using the promise-based API of mysql2
		await pool.execute(updateQuery, updateValues);
		res.status(200).json({ message: 'Category updated successfully' });
	} catch (error) {
		console.error('Error updating category:', error);
		if (newCategoryLogo) {
            const filePath = `uploads/categories/${newCategoryLogo}`;
            fs.unlinkSync(filePath); // Delete the uploaded file if an error occurred
        }

		if (error.code === 'ER_DUP_ENTRY') {
			// Handle the specific error for duplicate entry
			res.status(500).json({ sqlMessage: error.sqlMessage });
		} else {
			res.status(500).json({ error: 'An error occurred while updating the category' });
		}
	}
});



// Define a route to delete a category by ID
router.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        // Check if the category with the given ID exists
        const [checkResult] = await pool.execute('SELECT category_id, cat_logo FROM categories WHERE category_id = ?', [categoryId]);
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'category not found' });
        }

        // Delete the category data
        const deleteQuery = 'DELETE FROM categories WHERE category_id = ?';
        await pool.execute(deleteQuery, [categoryId]);

        // If there's an associated image, delete it
        if (checkResult[0].cat_logo) {
            const filePath = `uploads/categories/${checkResult[0].cat_logo}`;
            fs.unlinkSync(filePath); // Delete the file synchronously
        }

        res.status(200).json({ message: 'Category Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'An error occurred while deleting the category' });
    }
});




// This route for Home Page dynamic search
router.get('/search', async (req, res) => {
	const searchQuery = req.query.q;

	try {
		const query = 'SELECT c.cat_name, c.cat_slug, c.cat_logo, COUNT(co.product_id) AS product_count FROM categories c LEFT JOIN products co ON c.category_id = co.category_id WHERE c.cat_name LIKE ? GROUP BY c.category_id ORDER BY product_count DESC LIMIT 3';
		const [results] = await pool.execute(query, [`%${searchQuery}%`]);
		res.status(200).json(results);
	} catch (error) {
		console.error('Error searching categories:', error);
		res.status(500).json({ error: 'An error occurred while searching categories' });
	}
});


// Define a route to get recommended categories For Home Tab
router.get('/recommended', async (req, res) => {
	try {
		// Your SQL query to select all category data
		const query = `SELECT * FROM categories WHERE cat_status = 'recommended' LIMIT 12`;
		const [results] = await pool.execute(query);
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
  });
  
  // Define a route to get popular categories Home Tab
  router.get('/popular', async (req, res) => {
	try {
		// Your SQL query to select all category data
		const query = `SELECT * FROM categories WHERE cat_status = 'popular' LIMIT 12`;
		const [results] = await pool.execute(query);
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
  });



  // Define a route to get categories by category type ID
  router.get('/typeId/:id', async (req, res) => {
	const catTypeId = req.params.id;
	try {
		// Your SQL query to select all category data
		const query = `SELECT * FROM categories WHERE cat_type_ID = ?`;
		const [results] = await pool.execute(query, [catTypeId]);
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving category data:', error);
		res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
  });


// Define a route to get related categories by category ID
router.get('/related/:categoryId/:parentCategoryId', async (req, res) => {
	const categoryId = req.params.categoryId;
	const parentCategoryId = req.params.parentCategoryId;
	try {
	  // Your SQL query to select all category data
	  const query = `
		SELECT *
		FROM categories
		WHERE (cat_parent_catID = ? OR cat_parent_catID = ?) AND category_id != ? ORDER BY RAND() LIMIT 8;
	  `;
  
	  const [results] = await pool.execute(query, [categoryId, parentCategoryId, categoryId]); // Passing the correct parameters
  
	  res.status(200).json(results);
	} catch (error) {
	  console.error('Error retrieving category data:', error);
	  res.status(500).json({ error: 'An error occurred while fetching category data' });
	}
  });


  
// Get post data by slug
router.get('/single/:slug', async (req, res) => {
	const catSlug = req.params.slug;
	try {
		// Your SQL query to select a post by ID
		const query = 'SELECT * FROM categories WHERE cat_slug = ?';
		const [results] = await pool.execute(query, [catSlug]);
		if (results.length === 0) {
			res.status(404).json({ error: 'post not found' });
		} else {
			res.status(200).json(results[0]); // Return the first result
		}
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});

  // product count with top category
  router.get('/topcategory/:count', async (req, res) => {
	const totalproduct = req.params.count; // Changed from req.query.count to req.params.count
	
	try {
		const query = `SELECT c.cat_name, c.cat_slug, c.cat_logo, COUNT(co.product_id) AS product_count FROM categories c LEFT JOIN products co ON c.category_id = co.category_id GROUP BY c.category_id ORDER BY product_count DESC LIMIT ?; `;
		const [results] = await pool.execute(query, [totalproduct]); // Using totalproduct as the parameter
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving post data:', error);
		res.status(500).json({ error: 'An error occurred while fetching post data' });
	}
});

// count total categories
router.get('/total/count', async (req, res) => {
	try {
		// Your SQL query to select all categories data
		const query = 'SELECT count(category_id) as total FROM categories';
		// Execute the query using the promise-based API of mysql2
		const [results] = await pool.execute(query);
		// Return the categories data as JSON
		res.status(200).json(results);
	} catch (error) {
		console.error('Error retrieving categories data:', error);
		res.status(500).json({ error: 'An error occurred while fetching categories data' });
	}
});


module.exports = router;