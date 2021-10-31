import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { authenticate } from '../services/auth';

const router = Router();
router.use(urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  // Parse body before authenticating
  const options = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await authenticate(options);

    // TODO: Return a session cookie with the private account key
    // (for now just the username or public ID)
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
  return res;
});

export default router;
