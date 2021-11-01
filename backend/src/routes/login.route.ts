import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { result } from 'lodash';
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
 * JWT + Cookie Authentication
 */
router.post(
  '/',
  passport.authenticate(
    'local', {
      failureRedirect: '/login',
  }),
  function (req, res, next) {
    console.log('made it');
    try {
      // const result = await getSelections();
      // res.status(result.status).send(result.data);
      res.status(200).send();
    } catch (err) {
      logger.err('An error occurred while retrieving registration resources: ' + err);
      return res.status(500).send({
        error: err || 'Something went wrong.',
      });
    }
});


/**
 * Log user out and redirect them to the main page
 */
router.get('/logoff', async function(req, res, next) {
  req.logout();
  res.redirect('/');
})

export default router;
