import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
const DOMAIN = import.meta.env.VITE_DOMAIN;
import AnnouncementItem from './AnnouncementItem';
/**
 * Custom view for the announcements page
 */
export default function AnnouncementsContainer() {

  // Return component
  return (
    <>
      <h1>AnnouncementsContainer</h1>
      <AnnouncementItem/>
    </>
  )
}
