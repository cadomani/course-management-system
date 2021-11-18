import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import AssignmentsContainer from './assignments/AssignmentsContainer';
const DOMAIN = import.meta.env.VITE_DOMAIN;


/**
 * Root view when accessing a course. Becomes a launching point for modules, assignments, assessments, syllabus, and more.
 */
export default function CourseContainer() {

  // Return component
  return (
    <>
      <AssignmentsContainer />

    </>
  )
}
