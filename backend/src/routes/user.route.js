const express = require('express');
const user = require('../services/user');

const router = new express.Router();

router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await user.listUsers(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.post('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await user.addUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params.id,
  };

  try {
    const result = await user.replaceUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.patch('/:id', async (req, res, next) => {
  const options = {
    id: req.params.id,
  };

  try {
    const result = await user.updateUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.get('/:id/profile', async (req, res, next) => {
  const options = {
    xUSERUUID: req.header('xUSERUUID'),
    id: req.params.id,
  };

  try {
    const result = await user.getUserProfile(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.put('/:id/profile', async (req, res, next) => {
  const options = {
    xUSERUUID: req.header('xUSERUUID'),
    id: req.params.id,
  };

  try {
    const result = await user.replaceUserProfile(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.patch('/:id/profile', async (req, res, next) => {
  const options = {
    xUSERUUID: req.header('xUSERUUID'),
    id: req.params.id,
  };

  try {
    const result = await user.updateUserProfile(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.get('/:id/uuid', async (req, res, next) => {
  const options = {
    id: req.params.id,
  };

  try {
    const result = await user.getUserUUID(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

module.exports = router;
