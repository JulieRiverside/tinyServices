// routes/profiles.js
const express = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadToCloudinary } = require('../cloudinary');
const Profile = require('../models/Profile')
const router = express.Router()

// CREATE
router.post("/", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.json(profile);
  } catch (err) {
    res.status(400).json({error:'Unable to create profile'})
  }
});

router.post('/profiles', upload.single('photo'), async (req, res) => {
  try {
    const { name, serviceType, area, whatsapp } = req.body;

    if (!name || !serviceType || !area || !whatsapp) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    let photo = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      photo = result.secure_url;
    }
  
    const profile = new Profile({ name, serviceType, area, whatsapp, photo });
    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL or Filter by area and service
router.get("/", async (req, res) => {
  const { area, service } = req.query;
  let filter = {};

  if (area) filter.area = area;
  if (service) filter.serviceType = service;

  const profiles = await Profile.find(filter);
  res.json(profiles);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({error:'Profile not found'})
  }
});

// (PUT and DELETE can be added later if needed)

module.exports = router
