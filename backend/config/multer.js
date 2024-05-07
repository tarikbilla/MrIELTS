const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define a function to set the destination folder based on the uploadURL parameter
const getDestination = (uploadURL) => (req, file, cb) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is in 'MM' format
  const dynamicPath = path.join(uploadURL, `${year}/${month}`);

  // Check if the directory exists, if not create it
  fs.mkdirSync(dynamicPath, { recursive: true });

  cb(null, dynamicPath);
};

// Function to generate a unique filename
const generateUniqueFilename = (uploadURL, originalname) => {
  const uploadPath = path.join(uploadURL, originalname);
  if (!fs.existsSync(uploadPath)) {
    return originalname; // No conflict, return the original name
  }

  let count = 1;
  while (true) {
    const filenameWithoutExt = path.basename(originalname, path.extname(originalname));
    const newFilename = `${filenameWithoutExt}_${count}${path.extname(originalname)}`;
    if (!fs.existsSync(path.join(uploadURL, newFilename))) {
      return newFilename; // Return the new unique filename
    }
    count++;
  }
};

// Define the function to create a multer instance with a specified uploadURL
const createMulter = (uploadURL) => multer({
  storage: multer.diskStorage({
    destination: getDestination(uploadURL), // Use the dynamic destination
    filename: function (req, file, cb) {
      const uniqueFilename = generateUniqueFilename(uploadURL, file.originalname);
      cb(null, uniqueFilename);
    },
  }),
});

module.exports = createMulter;
