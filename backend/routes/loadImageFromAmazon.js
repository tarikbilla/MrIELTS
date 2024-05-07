const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { url } = req.query;

    // Make a request to Amazon or any logic you have for getting image URLs
    const response = await axios.get(url);

    // Scrape image URLs from the HTML content
    const imageUrls = scrapeImageUrls(response.data);

    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to scrape image URLs from HTML content
const scrapeImageUrls = (html) => {
  const $ = cheerio.load(html);

  // Adjust the selector according to the structure of the product page
  const imageUrls = [];
  $('#imgTagWrapperId img').each((index, element) => {
    const imageUrl = $(element).attr('src');
    if (imageUrl) {
      imageUrls.push(imageUrl);
    }
  });

  return imageUrls;
};

module.exports = router;
