// server/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

// Handle file upload
async function uploadToCloudinary(filePath) {
  return await cloudinary.uploader.upload(filePath, { folder: "profiles" });
}

module.exports = { uploadToCloudinary };
