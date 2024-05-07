const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.post('/', (req, res) => {
  if (!req.files || !req.files.storeImage) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.storeImage;
  const uploadPath = __dirname + '/' + uploadedFile.name;
  
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({
      uploaded: true,
      url: `/${uploadedFile.name}`,
    });
  });
});


router.get("/", (req, res) => {
  res.send("Hello, Express!");
});

module.exports = router;
