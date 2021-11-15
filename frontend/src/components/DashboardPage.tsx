import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

// Dynamically load domain to avoid hardcoding routes
const DOMAIN = import.meta.env.VITE_DOMAIN;
import CoursesContainer from './courses/CoursesContainer';


/**
 * Main view after login. Every element should be accessible directly from here or through here.
 */
export default function DashboardPage() {
  return (
    <>
    </>
  )
}
