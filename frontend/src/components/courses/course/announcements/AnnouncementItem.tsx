// Libraries
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

// Chakra
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Text,
  Textarea,
  Button,
  useToast,
  UseToastOptions
} from "@chakra-ui/react"

// Types
import { DOMAIN, CourseAnnouncement } from '../../../../shared/types'

/**
 * A single announcement list element
 */
export default function StudentAnnouncementItem({ courseAnnouncement }: { courseAnnouncement: CourseAnnouncement }) {

  // Return component
  return (
    <Box w="100%">
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton bg="gray.200">
              <Box flex="1" textAlign="left">
                {courseAnnouncement.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text mb="8px">
              {courseAnnouncement.description}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
