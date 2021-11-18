import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import AssignmentItem from './AssignmentItem';
const DOMAIN = import.meta.env.VITE_DOMAIN;

/**
 * Custom view for the assignments page
 */
export default function AssignmentsContainer() {

  // Return component
  return (
    <>
      <AssignmentItem />
    </>
  )
}
