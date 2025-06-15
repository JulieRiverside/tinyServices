// server/routes/profiles.js
const express = require('express');
const Profile = require('../models/Profile'); // your Mongoose Model
const upload = require('../cloudinaryStorage'); // multer configured with Cloudinary storage

const router = express.Router();


// CREATE
router.post("/", upload.single("photo"), async (req, res) => {
  console.log('req.body >>>', req.body);
  console.log('req.file >>>', req.file);
  try {
    const { name, serviceType, area, whatsapp } = req.body;

    if (!name || !serviceType || !area || !whatsapp) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // photo is already a Cloudinary URL thanks to multer-storage-cloudinary
    const photo = req.file?.path;

    const profile = await Profile.create({ name, serviceType, area, whatsapp, photo });

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

// GET by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ error:'Profile not found' })
  }
});

// (PUT and DELETE can be added later if needed)

module.exports = router;
