import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { listUsers, createUser, replaceUser, updateUser, getUserProfile, updateUserProfile, getUserUUID } from '../services/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const router = Router();
router.use(urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
  try {
    const result = await listUsers();
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

/**
 * Create a new user, either as an administrator or as a routine through registration.
 * major_id and college_id form data are numerical to access specific records and are mapped from course listing.
 */
router.post('/', async (req, res, next) => {
  const options = {
    name: req.body.name,
    email: req.body.email,
    biography: req.body.biography,
    university: process.env.UNIVERSITY as string,
    password: 'NOT_IMPLEMENTED', // TODO: Need hashing and salting before using this
    major_id: req.body.major_id as number,
    college_id: req.body.college_id as number,
  };

  try {
    const result = await createUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        logger.err('A user already exists with this email.');
        return res.status(403).send({
          status: 'failure',
          detail: 'An account already exists with this email address. Please log in instead.'
        });
      }
    }
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.put('/:id', async (req, res, next) => {
  const identity = {
    publicId: req.params.id as string,
  }

  const options = {
    name: req.body.name,
    email: req.body.email,
    biography: req.body.biography,
    university: process.env.UNIVERSITY as string,
    password: 'NOT_IMPLEMENTED', // TODO: Need hashing and salting for this
    major_id: req.body.major_id,
    college_id: req.body.college_id,
  };

  try {
    const result = await replaceUser(identity, options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.patch('/:id', async (req, res, next) => {
  // Check for presence of UUID header
  const identity = {
    publicId: req.params.id,
  }

  const options = {
    name: req.body.name,
    biography: req.body.biography,
    university: process.env.UNIVERSITY as string,
    college_id: req.body.college,
  };

  try {
    const result = await updateUser(identity, options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.get('/:id/profile', async (req, res, next) => {
  // Check for presence of UUID header
  // const uuid = req.headers['x-user-uuid'];
  // if (typeof (uuid) === 'object' || typeof (uuid) === 'undefined') {
  //   logger.err('This resource cannot be retrieved: X-USER-UUID header missing.');
  //   return {
  //     status: 400,
  //     data: "This resource cannot be retrieved: X-USER-UUID header missing."
  //   };
  // }

  const identity = {
    publicId: req.params.id,
    // uuid: uuid,
  }

  try {
    const result = await getUserProfile(identity);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
});

router.patch('/:id/profile', async (req, res, next) => {
  // Check for presence of UUID header and verify JWT value before continuing
  const uuid = req.headers['x-user-uuid'];
  if (typeof (uuid) === 'object' || typeof (uuid) === 'undefined') {
    logger.err('This resource cannot be retrieved: X-USER-UUID header missing.');
    return {
      status: 400,
      data: "This resource cannot be retrieved: X-USER-UUID header missing."
    };
  }

  const identity = {
    publicId: req.params.id,
    uuid: uuid,
  }

  const options = {
    name: req.body.name,
    biography: req.body.biography,
    university: process.env.UNIVERSITY as string,
    college_id: req.body.college,
  };

  try {
    const result = await updateUserProfile(identity, options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

router.get('/:id/uuid', async (req, res, next) => {
  // TODO: Validate JWT before continuing
  const identity = {
    publicId: req.params.id,
    uuid: undefined
  };

  try {
    const result = await getUserUUID(identity);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

export default router;
