import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { getUserProfile, updateUserProfile, getUserProfilePhoto, replaceUserProfilePhoto } from '../services/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { generateFakeEnrollment } from 'src/services/user';

const router = Router();
router.use(urlencoded({ extended: true }));



router.get('/:id/enrollments', async (req, res, next) => {
  try {
    // const result = await listCourses(options);
    let fakeEnrollments = await generateFakeEnrollment(5);
    res.status(200).send(fakeEnrollments);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});


router.get('/user/:id/profile', async (req, res, next) => {
  try {
    const result = await getUserProfile(req.body.id);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});


router.patch('/user/:id/profile', async (req, res, next) => {  
  try {
    const options = {
      id: req.body.id,
      name: req.body.name,
      biography: req.body.biography,
    };
    const result = await updateUserProfile(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.get('/user/:id/profilePhoto', async (req, res, next) => {
  try {
    const result = await getUserProfilePhoto(req.body.id);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.put('/user/:id/profilePhoto', async (req, res, next) => {
  try {
    const result = await replaceUserProfilePhoto(req.body.id);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

export default router;
