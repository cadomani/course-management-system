import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import passport from 'passport';
import '../core/auth';

const router = Router();
router.use(urlencoded({ extended: true }));

/**
 * Send a request for authentication.
 * 
 * Params: None
 * Body: [email*, password*]
 * 
 * Response:
 * Session Cookie Set
 */
router.post(
  '/',
  passport.authenticate(
    'local', {
    session: true
  }),
  function (req, res, next) {
    try {
      res.status(200).send();
    } catch (err) {
      logger.err('An error occurred while attempting to log in: ' + err);
      return res.status(500).send({
        error: err || 'Something went wrong.',
      });
    }
  });


/**
 * Log user out and redirect them to the main page
 */
router.get('/logoff', async function (req, res, next) {
  req.logout();
  res.redirect('/');
})

export default router;
