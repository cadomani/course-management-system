const { Router } = require('express');

const User = require('../models/user');

const router = Router();

// Get a list of all users added to database
router.get('/', async (req, res, next) => {
  try {
    const entries = await User.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// Check if a username is available
router.get('/checkUsernameAvailable', async (req, res, next) => {
  try {
    // TODO: Disabled to avoid excessive calls to database, should cache
    // const entries = await User.find({
    //   username: req.query['username']
    // });
    // if (!entries[0]) {
    //   console.log("Username not found, valid username...");
    //   res.status(100);
    // } else {
    //   res.status(409);
    // }
    res.json(null);
  } catch (error) {
    next(error);
  }
});

// Add a new user to the users database
router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body);
    const createdEntry = await user.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
