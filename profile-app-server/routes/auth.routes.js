const User = require('../models/User.model');
const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
  const { username, password, campus, course } = req.body;

  try {
    if (password === '' || username === '' || campus === '' || course === '') {
      res
        .status(400)
        .json({ message: 'Provide password, username, campus and course' });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
      });
    }

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
      campus,
      course,
    });

    const {
      username: createdUsername,
      password: createdPassword,
      campus: createdCampus,
      course: createdCourse,
      _id: createdId,
    } = createdUser;

    //leave out password

    const user = {
      createdUsername,
      createdCampus,
      createdCourse,
      createdId,
    };

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
  } catch (error) {}
});

router.get('/verify', async (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = router;
