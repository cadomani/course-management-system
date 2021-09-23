const express = require('express');
const static = require('../services/static');
const router = new express.Router();
 
router.get('/:id/profile-photo', async (req, res, next) => {
  let options = { 
    "id": req.params.id,
  };


  try {
    const result = await static.getUserProfilePhoto(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.put('/:id/profile-photo', async (req, res, next) => {
  let options = { 
    "xUSERUUID": req.header("xUSERUUID"),
    "id": req.params.id,
  };


  try {
    const result = await static.replaceUserProfilePhoto(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;