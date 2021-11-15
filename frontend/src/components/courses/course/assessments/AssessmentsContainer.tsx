import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import AssessmentItem from './AssessmentItem';
const DOMAIN = import.meta.env.VITE_DOMAIN;

/**
 * Custom view for the assessments page
 */
export default function AssessmentsContainer() {

  // Return component
  return (
    <>
      <h1>AssessmentsContainer</h1>
      <AssessmentItem/>
    </>
  )
}
