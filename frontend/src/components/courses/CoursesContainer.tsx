import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
const DOMAIN = import.meta.env.VITE_DOMAIN;
import CourseItem from './CourseItem';

export default function CoursesContainer() {

  // Return component
  return (
    <>
      <h1>CoursesContainer</h1>
      <CourseItem/>
    </>
  )
}
