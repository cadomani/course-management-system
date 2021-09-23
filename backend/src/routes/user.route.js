const express = require('express');
const user = require('../services/user');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
  };


  try {
    const result = await user.listUsers(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.post('/', async (req, res, next) => {
  let options = { 
  };


  try {
    const result = await user.addUser(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.put('/:id', async (req, res, next) => {
  let options = { 
    "id": req.params.id,
  };


  try {
    const result = await user.replaceUser(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.patch('/:id', async (req, res, next) => {
  let options = { 
    "id": req.params.id,
  };


  try {
    const result = await user.updateUser(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.get('/:id/profile', async (req, res, next) => {
  let options = { 
    "xUSERUUID": req.header("xUSERUUID"),
    "id": req.params.id,
  };


  try {
    const result = await user.getUserProfile(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.put('/:id/profile', async (req, res, next) => {
  let options = { 
    "xUSERUUID": req.header("xUSERUUID"),
    "id": req.params.id,
  };


  try {
    const result = await user.replaceUserProfile(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.patch('/:id/profile', async (req, res, next) => {
  let options = { 
    "xUSERUUID": req.header("xUSERUUID"),
    "id": req.params.id,
  };


  try {
    const result = await user.updateUserProfile(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.get('/:id/uuid', async (req, res, next) => {
  let options = { 
    "id": req.params.id,
  };


  try {
    const result = await user.getUserUUID(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;