// Required for handling async errors
require('express-async-errors');
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const pool = require("./db");
const storesRouter = require('./routes/stores');
const categoriesRouter = require('./routes/categories');
const categoryTypeRouter = require('./routes/categorytypes');
const productsRouter = require('./routes/products');
const postCategoriesRouter = require('./routes/postCategories');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const slidersRouter = require('./routes/sliders');
const ckImageUploadPath = require('./routes/ckImageUpload');
const loadImageFromAmazon = require('./routes/loadImageFromAmazon');
const amzProductData = require('./routes/amzProductData');
const settingsRouter = require('./routes/settings');
const seoRouter = require('./routes/seo');
const uploadBlogImage = require('./routes/uploadBlogImage');

// To allow requests from your frontend domain
const corsOptions = {
  origin: ['https://mrielts.org', 'http://localhost:3000']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: 'ASDFGHJKL!@#$%^&*()QWERTYUIOOP',
    resave: false,
    saveUninitialized: false,
  })
);

// Security Headers
app.use((req, res, next) => {
  res.header('Content-Security-Policy', "default-src 'self'; img-src * data:;");
  // Add more headers as needed
  next();
});

app.use('/uploads', express.static('uploads'));
app.use('/api/stores', storesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/uploads', ckImageUploadPath);
app.use('/api/category-type', categoryTypeRouter);
app.use('/api/products', productsRouter);
app.use('/api/post-categories', postCategoriesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', userRouter);
app.use('/api/sliders', slidersRouter);
app.use('/api/amz-img', loadImageFromAmazon);
app.use('/api/amz-product-data', amzProductData);
app.use('/api/settings', settingsRouter);
app.use('/api/seo', seoRouter);
app.use('/upload/blogImage', uploadBlogImage);

// Handle the root endpoint
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Place error handling middleware at the end
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listen on the specified port
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
});

// Gracefully close the database connection on exit
process.on("exit", () => {
  pool.end((err) => {
    console.error("Error closing the database connection:", err);
  });
});

// Handle SIGINT for graceful shutdown
process.on("SIGINT", () => {
  console.log("Process terminated");
  process.exit(0);
});
