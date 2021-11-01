import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import passport from 'passport';
import { IVerifyOptions } from "passport-local";
//import { getSelections } from '../services/login';
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
 * JWT + Cookie Authentication (Not yet implemented)
 */
router.post(
  '/',
  passport.authenticate(
    'local', {
    session: false,
    // successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'The username or password entered was incorrect. Please try again.'
  }),
  function (req, res, next) {
    try {
      logger.info(`Login successful for user `);
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
