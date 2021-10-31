import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { listCourses, createCourse, replaceCourse, updateCourse } from '../services/course';

const router = Router();
router.use(urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await listCourses(options);
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
    const result = await createCourse(options);
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
    const result = await replaceCourse(options);
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
    const result = await updateCourse(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

export default router;