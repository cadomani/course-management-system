// Libraries
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

// Views
import StudentAnnouncementItem from './AnnouncementItem';

// Chakra
import {
  Box,
  Spacer,
  Stack,
  Text,

} from '@chakra-ui/react';

// Types
import { DOMAIN, CourseAnnouncement } from '../../../../shared/types'

/**
 * Custom view for the announcements page
 */
export default function AnnouncementsContainer({ courseAnnouncements }: { courseAnnouncements: CourseAnnouncement[] }) {

  // Return component
  return (
    <Stack align="stretch" width="100%" padding="0px 20px 0px 10px">
      <Text fontSize="xl" fontFamily="Montserrat, sans-serif" fontWeight="regular">Announcements:</Text>
      {courseAnnouncements && (courseAnnouncements).map((data: any, index: number) => {
        return <StudentAnnouncementItem
          key={index}
          courseAnnouncement={data}
        />
      })}
    </Stack>
  )
}
