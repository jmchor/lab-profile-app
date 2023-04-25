const User = require('../models/User.model');
const mongoose = require('mongoose');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { isAuthenticated } = require('../middleware/jwt.middleware');

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
  const { username, password } = req.body;

  try {
    if (password === '' || username === '') {
      res.status(400).json({ message: 'Provide password and username' });
      return;
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      res.status(400).json({ message: 'User not found.' });
      return;
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, username } = foundUser;
      const payload = { _id, username };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '6h',
      });

      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: 'Unable to authenticate the user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/verify', isAuthenticated, async (req, res, next) => {
  try {
    console.log(`req.payload`, req.payload);

    res.status(200).json(req.payload);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
