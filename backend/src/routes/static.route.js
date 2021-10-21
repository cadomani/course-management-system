const express = require('express');
const staticFiles = require('../services/static');

const router = new express.Router();

router.get('/:id/profile-photo', async (req, res, next) => {
  const options = {
    id: req.params.id,
  };

  try {
    const result = await staticFiles.getUserProfilePhoto(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.put('/:id/profile-photo', async (req, res, next) => {
  const options = {
    xUSERUUID: req.header('xUSERUUID'),
    id: req.params.id,
  };

  try {
    const result = await staticFiles.replaceUserProfilePhoto(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

module.exports = router;
