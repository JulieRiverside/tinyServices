// routes/profiles.js
const express = require('express')
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

router.post('/profiles', async (req, res) => {
  try {
    // photo is base64 in this case
    const { name, serviceType, area, whatsapp, photo } = req.body;

    if (!name || !serviceType || !area || !whatsapp) {
      return res.status(400).json({ message: "All fields are required" });
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
