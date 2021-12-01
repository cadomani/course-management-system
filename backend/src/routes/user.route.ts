import logger from "@shared/Logger";
import { Router, urlencoded } from "express";
import {
  getUserProfile,
  getStudentEnrollment,
  getStudentAssignments,
  getStudentAnnouncements,
} from "../services/user";
import "../core/auth";
import { loginRequired } from "src/util/dependencies";

const router = Router();
router.use(urlencoded({ extended: true }));


router.get("/:id/enrollments", async (req, res) => {
  const userId = Number.parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(422).send({
      status: "error",
      details: "An invalid userId was sent."
    })
  }
  const enrollments = await getStudentEnrollment(userId);
  res.status(200).send(enrollments.data);
});

router.get("/:id/course/:courseId/assignments", async (req, res) => {
  const userId = Number.parseInt(req.params.id);
  const courseId = Number.parseInt(req.params.courseId);
  if (isNaN(userId) || isNaN(courseId)) {
    return res.status(422).send({
      status: "error",
      details: "An invalid userId or courseId was sent."
    })
  }

  const assignments = await getStudentAssignments(userId, courseId);
  return res.status(200).send(assignments.data);
});

router.get("/:id/course/:courseId/announcements", async (req, res) => {
  const userId = Number.parseInt(req.params.id);
  const courseId = Number.parseInt(req.params.courseId);
  if (isNaN(userId) || isNaN(courseId)) {
    return res.status(422).send({
      status: "error",
      details: "An invalid userId or courseId was sent."
    })
  }

  const announcements = await getStudentAnnouncements(userId, courseId);
  return res.status(200).send(announcements.data);
});

router.get("/:id/profile", async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const result = await getUserProfile(userId);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      error: err || "Something went wrong.",
    });
  }
  return res;
});

export default router;
