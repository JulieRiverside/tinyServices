// server/cloudinaryStorage.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("./cloudinary"); // <- reuse configured Cloudinary

const storage = new CloudinaryStorage({ 
  cloudinary: cloudinary, 
  params: { folder: "profiles" }
});

// Prepare multer to use Cloudinary
const upload = multer({ storage });

module.exports = upload;
