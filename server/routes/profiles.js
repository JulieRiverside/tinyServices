// server/routes/profiles.js
const express = require('express');
const Profile = require('../models/Profile'); // your Mongoose Model
const upload = require('../cloudinaryStorage'); // multer configured with Cloudinary storage

const auth = require('../middleware/auth')
const router = express.Router();


// CREATE
router.post("/", auth,upload.single("photo"), async (req, res) => {
  try {
    const { name, serviceType, area, whatsapp } = req.body;

    if (!name || !serviceType || !area || !whatsapp) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // photo is already a Cloudinary URL thanks to multer-storage-cloudinary
    const photo = req.file?.path;

    const profile = await Profile.create({name, serviceType, area, whatsapp, photo, owner: req.userId});
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err?.message || "Server Error" });
  }
});

// GET all or filter by area, service
router.get("/", async (req, res) => {
  const { area, service } = req.query;
  let filter = {};

  if (area) filter.area = area;
  if (service) filter.serviceType = service;

  const profiles = await Profile.find(filter);
  res.json(profiles);
});

// GET /api/profiles/my
router.get('/my', auth, async (req, res) => {
  try {
    console.log("Looking up profile for userId:", req.userId);
    const profile = await Profile.findOne({ owner: req.userId });
    if (!profile) return res.status(404).json({ message: "No profile found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// GET by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ error:'Profile not found' })
  }
});



// GET /api/profiles/user/:userId → get profile by userId
router.get('/user/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// (PUT and DELETE can be added later if needed)
// Update profile
router.put("/:id", auth, upload.single("photo"), async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    if (profile.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const { name, serviceType, area, whatsapp } = req.body;
    if (name) profile.name = name;
    if (serviceType) profile.serviceType = serviceType;
    if (area) profile.area = area;
    if (whatsapp) profile.whatsapp = whatsapp;
    if (req.file?.path) profile.photo = req.file.path;

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err?.message || "Server Error" });
  }
});



module.exports = router;
