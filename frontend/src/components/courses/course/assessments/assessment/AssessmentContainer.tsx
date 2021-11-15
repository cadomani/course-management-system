import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import ExamContainer from './ExamContainer';
const DOMAIN = import.meta.env.VITE_DOMAIN;

/**
 * Root assessment view containing information about the assessment to be taken and options to start it
 */
export default function AssessmentContainer() {

  // Return component
  return (
    <>
      <h1>Assessment Container</h1>
      <ExamContainer/>
    </>
  )
}
