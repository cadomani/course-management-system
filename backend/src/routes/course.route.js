const express = require('express');
const course = require('../services/course');

const router = new express.Router();

router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await course.listCourses(options);
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
    const result = await course.createCourse(options);
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
    const result = await course.replaceCourse(options);
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
    const result = await course.updateCourse(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

module.exports = router;
