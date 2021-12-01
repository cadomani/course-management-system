import logger from '@shared/Logger';
import { Router, urlencoded } from 'express';

const router = Router();
router.use(urlencoded({ extended: true }));

// DEPRECATED: Moved to user route
// router.get('/:courseId/announcements', async (req, res, next) => {
//   const courseId = Number.parseInt(req.params.courseId);
//   if (isNaN(courseId)) {
//     return res.status(422).send({
//       status: "error",
//       details: "An invalid userId was sent."
//     })
//   }

//   // const result = await listCourses(options);
//   let announcements = await getCourseAnnouncements(courseId);
//   return res.status(200).send(announcements);
// });

export default router;
