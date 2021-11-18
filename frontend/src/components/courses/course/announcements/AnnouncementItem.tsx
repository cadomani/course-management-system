import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
const DOMAIN = import.meta.env.VITE_DOMAIN;

/**
 * A single announcement list element
 */
export default function AnnouncementItem() {

  // Return component
  return (
    <>
      <h1>AnnouncementItem</h1>
    </>
  )
}
