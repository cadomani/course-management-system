import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { getUserProfilePhoto, replaceUserProfilePhoto } from '../services/static';

const router = Router();
router.use(urlencoded({ extended: true }));

router.get('/:id/profile-photo', async (req, res, next) => {
  const options = {
    uuid: req.headers['x-user-uuid'],
    userId: req.params.id,
  };

  try {
    const result = await getUserProfilePhoto(options);
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
    uuid: req.headers['x-user-uuid'],
    userId: req.params.id,
  };

  // Check for presence of UUID header
  if (options.uuid == [] || options.uuid == undefined) {
    logger.err('This resource cannot be retrieved: X-USER-UUID header missing.')
    return res.status(400).send({
      status: "failure",
      detail: "This resource cannot be retrieved: X-USER-UUID header missing."
    });
  }

  try {
    const result = await replaceUserProfilePhoto(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

export default router;
