const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../services/auth');

const router = new express.Router();

router.use(express.urlencoded({ extended: true }));
router.post('/', async (req, res) => {
  // Parse body before authenticating
  const options = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await auth.authenticate(options);

    // TODO: Return a session cookie with the private account key
    // (for now just the username or public ID)
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

module.exports = router;
