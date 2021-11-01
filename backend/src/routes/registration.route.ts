import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';
import { getPrograms, getEmailAvailable, getSections, createStudent, rollbackStudent } from '../services/registration';

const router = Router();
router.use(urlencoded({ extended: true }));

/**
 * Get all the available colleges and majors for registration selection.
 * 
 * Params: None
 * Query: None
 * 
 * @example
 * /registration/programs
 * 
 * @returns
 * JSON[] ->
 *    id: number
 *    name: string
 *    major[]:
 *      id: number
 *      name: string
 */
router.get('/programs', async (req, res, next) => {
  try {
    const result = await getPrograms();
    res.status(result.status).send(result.data);
  } catch (err) {
    logger.err('An error occurred while retrieving registration resources: ' + err);
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
});

/**
 * Check if email is already registered in real time. The '@' symbol should be URL encoded to '%40'.
 * Warning: Send request when email textbox has lost focus only, it will be rate limited.
 * 
 * Params: None
 * Query: available=<EMAILADDRESS>
 * 
 * @example
 * /registration/validate?available=studentemail%40auburn.edu
 * 
 * @returns
 * JSON ->
 *    available: boolean
 */
router.get('/validate', async (req, res, next) => {
  try {
    const emailAddress = req.query.available;
    if (typeof (emailAddress) !== 'string') {
      throw new Error('an email address must be supplied to use this resource');
    }
    const result = await getEmailAvailable(emailAddress);
    res.status(result.status).send(result.data);
  } catch (err) {
    logger.err('An error occurred while retrieving email availability: ' + err);
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
})


/**
 * Get all sections available for this major. 
 * For now, limited to those belonging to the major only.
 * 
 * Params: None
 * Query: major=<major_id>
 * 
 * @example
 * /registration/sections?major=133
 * 
 * @returns
 * JSON[] ->
 *    id: number
 *    name: string
 */
router.get('/sections', async (req, res, next) => {
  try {
    const major_id = req.query.major;
    if (typeof (major_id) !== 'string') {
      throw new Error('a major id must be supplied to use this resource');
    }
    const result = await getSections(major_id);
    res.status(result.status).send(result.data);
  } catch (err) {
    logger.err('An error occurred while retrieving email availability: ' + err);
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
})



/**
 * Submit intent to add a new user to the database and returns public profile id if successful.
 * 
 * Params: None
 * Body: Form(name*, email*, major_id*, sections[]*)
 */
router.post('/', async (req, res, next) => {
  try {
    const newStudent = {
      name: req.body.name as string,
      email: req.body.email as string,
      password: req.body.password as string,
      major_id: req.body.major_id as number,
      sections: req.body.sections as number[]
    }
    const result = await createStudent(newStudent);
    res.status(result.status).send(result.data);
  } catch (err) {
    logger.err('An error occurred while creating student account: ' + err);
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
})

/**
 * DEBUG ROUTE: Allows us to roll back the last registration by sending a user id.
 */
router.post('/rollback', async (req, res, next) => {
  try {
    const result = await rollbackStudent(req.body.public_id);
    res.status(result.status).send(result.data);
  } catch (err) {
    logger.err('An error occurred while creating student account: ' + err);
    return res.status(500).send({
      error: err || 'Something went wrong.',
    });
  }
})

export default router;
