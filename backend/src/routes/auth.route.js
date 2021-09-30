const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../services/auth');

const router = new express.Router();

router.use(express.json());
router.post('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await auth.authenticate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

module.exports = router;
