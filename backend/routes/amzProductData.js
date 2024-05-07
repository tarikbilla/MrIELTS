const express = require('express');
const router = express.Router();
const amazonPaapi = require('amazon-paapi');
const url = require('url');
require('dotenv').config();

// Define your API credentials and associate tag from environment variables
const commonParameters = {
  AccessKey: process.env.ACCESS_KEY_ID,
  SecretKey: process.env.SECRET_ACCESS_KEY,
  PartnerTag: process.env.ASSOCIATE_TAG,
};



// Function to extract ASIN from Amazon URL
function extractASINFromURL(amazonUrl) {
  if (!amazonUrl) return null;

  const parsedUrl = url.parse(amazonUrl);
  const pathSegments = parsedUrl.pathname.split('/');
  const asinIndex = pathSegments.findIndex(segment => segment.match(/^B[0-9A-Z]{9}$/));
  return asinIndex !== -1 ? pathSegments[asinIndex] : null;
}

// Function to format the API response
function formatResponse(data) {
  // Format and extract the necessary fields from the API response
  // You can customize this based on your requirements
  return {
    // Example formatting
    ASIN: data?.ItemsResult?.Items[0]?.ASIN || null,
    Title: data?.ItemsResult?.Items[0]?.ItemInfo?.Title?.DisplayValue || null,
    Brand: data?.ItemsResult?.Items[0]?.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || null,
    Price: data?.ItemsResult?.Items[0]?.Offers?.Listings[0]?.Price?.DisplayAmount || null,
    PrimaryImage: data?.ItemsResult?.Items[0]?.Images?.Primary?.Large?.URL || null,
    VariantsImages: data?.ItemsResult?.Items[0]?.Images || null,
    Availability: data?.ItemsResult?.Items[0]?.Offers?.Listings[0]?.Availability?.Type || null,
    Promotions: data?.ItemsResult?.Items[0]?.Offers?.Listings[0]?.Promotions || null,
    FeedbackRating: data?.ItemsResult?.Items[0]?.Offers?.Listings[0]?.MerchantInfo?.FeedbackRating || null,
  };
}
// Function to format the API response
function formatMultiResponse(data) {
  return {
    ASIN: data,
  };
}

// Define a route for the product endpoint
router.get('/', (req, res) => {

  // Extract the ASIN from the Amazon URL query parameter
  const amazonUrl = req.query.url;
  const asin = extractASINFromURL(amazonUrl);

  // If ASIN is not found or URL is invalid, send an error response
  if (!asin) {
    return res.status(400).json({ error: 'Invalid Amazon URL or ASIN not found' });
  }

  // Define parameters for the API request
  const requestParameters = {
    ItemIds: [asin],
    Condition: 'New',
    Resources: [
        'Images.Primary.Large',
        'Images.Variants.Large',
        'ItemInfo.Title',
        "ItemInfo.ByLineInfo",
        'Offers.Listings.Price',
        'Offers.Listings.Availability.Type',
        'Offers.Listings.MerchantInfo',
        'Offers.Listings.Promotions',
    ],
    PartnerType: 'Associates',
  };

  // Make a request to the Amazon Product Advertising API with retry mechanism
  makeRequestWithRetry(commonParameters, requestParameters)
    .then((data) => {
      // Handle API response
      const formattedData = formatResponse(data);
      res.json(formattedData); // Send the formatted response as JSON
    })
    .catch((error) => {
      // Handle API error
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    });
});

// Function to make request to Amazon PA API with retry mechanism and exponential backoff
function makeRequestWithRetry(commonParameters, requestParameters, retries = 3, delay = 100, backoffFactor = 2) {
  return new Promise((resolve, reject) => {
    amazonPaapi.GetItems(commonParameters, requestParameters)
      .then(resolve)
      .catch((error) => {
        if (retries <= 0) {
          reject(error);
          return;
        }
        console.error(`Error occurred, ${retries} retries left. Retrying after ${delay}ms.`);
        setTimeout(() => {
          makeRequestWithRetry(commonParameters, requestParameters, retries - 1, delay * backoffFactor, backoffFactor)
            .then(resolve)
            .catch(reject);
        }, delay);
      });
  });
}



// get all datas
router.post('/batch', async (req, res) => {
  const urls = req.body.urls;
  const asins = urls.map(url => extractASINFromURL(url)).filter(asin => asin != null);


  const requestParameters = {
    ItemIds: asins,
    ItemIdType: "ASIN",
    Condition: 'New',
    Resources: [
        'Images.Primary.Large',
        'Images.Variants.Large',
        'ItemInfo.Title',
        "ItemInfo.ByLineInfo",
        'Offers.Listings.Price',
        'Offers.Listings.Availability.Type',
        'Offers.Listings.MerchantInfo',
        'Offers.Listings.Promotions',
    ],
    PartnerType: 'Associates',
  };

  // Make a request to the Amazon Product Advertising API with retry mechanism
  makeRequestWithRetry(commonParameters, requestParameters)
    .then((data) => {
      // Handle API response
      // const formattedData = formatMultiResponse(data);
      res.json(data); // Send the formatted response as JSON
    })
    .catch((error) => {
      // Handle API error
      // console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    });
});

module.exports = router;
