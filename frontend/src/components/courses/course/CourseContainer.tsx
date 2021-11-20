// Libraries
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

// Views
import AssignmentsContainer from './assignments/AssignmentsContainer';

// Chakra
import {
  VStack,
  Text,
  Divider
} from '@chakra-ui/layout';
import {
  useToast,
  UseToastOptions
} from '@chakra-ui/toast';

// Types
import { DOMAIN, CourseInfo, CourseAssignment, CourseAnnouncement } from '../../../shared/types'
import AnnouncementsContainer from './announcements/AnnouncementsContainer';
import { Box, HStack } from '@chakra-ui/react';

/**
 * Root view when accessing a course. Becomes a launching point for modules, assignments, assessments, syllabus, and more.
 */
export default function CourseContainer({ courseInfo }: { courseInfo: CourseInfo }) {
  const [assignments, setAssignments] = useState<CourseAssignment[]>();
  const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>();
  const [errorToast, setErrorToast] = useState<UseToastOptions>();

  // Handle error toast notifications
  const toast = useToast();
  useEffect(() => {
    if (typeof errorToast !== 'undefined') {
      (() =>
        toast(errorToast)
      )();
    }
  }, [errorToast])

  // Retrieve fake course assignments from server
  useEffect(() => {
    (async function getAssignments() {
      await axios.get(`${DOMAIN}/api/course/${courseInfo.id}/assignments`)
        .then(function (res) {
          // Handle success (200 OK)
          setAssignments(res.data)
        })
        .catch(function (err) {
          // Handle failure
          setErrorToast({
            title: "API Error",
            description: "Cannot connect to backend",
            status: "error",
            position: "top",
            isClosable: false
          })
        });
    })();
    (async function getAnnouncements() {
      await axios.get(`${DOMAIN}/api/course/${courseInfo.id}/announcements`)
        .then(function (res) {
          // Handle success (200 OK)
          setAnnouncements(res.data)
        })
        .catch(function (err) {
          // Handle failure
          setErrorToast({
            title: "API Error",
            description: "Cannot connect to backend",
            status: "error",
            position: "top",
            isClosable: false
          })
        });
    })();
  }, [courseInfo]);

  // Return component
  return (
    <div>
      <VStack alignContent="center">
        {/* Show course information */}
        <Text paddingTop="3" fontSize="4xl" fontFamily="Montserrat, sans-serif" fontWeight="bold">
          {courseInfo.name}
        </Text>
        <Text marginTop="0 !important" fontSize="lg" fontFamily="Montserrat, sans-serif" fontWeight="regular">
          {courseInfo.instructor} - {courseInfo.tag} {courseInfo.num} - Fall '21
        </Text>
        <Text fontSize="sm" fontFamily="Montserrat, sans-serif" fontWeight="regular" paddingBottom="15px">
          ({courseInfo.start} - {courseInfo.end})
        </Text>

        <Divider />
      </VStack>
      <HStack alignItems="flex-start" w="100%" padding="20px 0px 15px 0px">
        
        <VStack w="80%">
          {/* Show assignments for this class */}
          <AssignmentsContainer courseAssignments={(assignments as CourseAssignment[])} />
        </VStack>
        <VStack w="20%">
          {/* TODO: Calendar */}
          {/* <Box h="150px" w="100%" backgroundColor="white">

          </Box> */}

          {/* Announcements View */ }
          <AnnouncementsContainer courseAnnouncements={(announcements as CourseAnnouncement[])} />
        </VStack>
    </HStack>
      

    </div>
  )
}
