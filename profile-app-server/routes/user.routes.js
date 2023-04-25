const User = require('../models/User.model');
const mongoose = require('mongoose');
const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      res.status(404).json({ message: 'No users found' });
      return;
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put('/users', async (req, res, next) => {
  const { imageUrl, _id } = req.body;

  try {
    const updateUser = await User.findOneAndUpdate(
      { _id },
      { imageUrl },
      { new: true }
    );
  } catch (error) {}
});

router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

module.exports = router;
