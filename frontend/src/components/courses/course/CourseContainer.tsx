import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import AssignmentsContainer from './assignments/AssignmentsContainer';
import { CourseAssignment } from './assignments/AssignmentItem';
import { VStack, Text, Divider } from '@chakra-ui/layout';
import axios from 'axios';
import { useToast, UseToastOptions } from '@chakra-ui/toast';
const DOMAIN = import.meta.env.VITE_DOMAIN;

// Types
type CourseInfo = {
  id: number
  name: string
  tag: string
  instructor: string
  start: string
  end: string
  num: string
}

/**
 * Root view when accessing a course. Becomes a launching point for modules, assignments, assessments, syllabus, and more.
 */
export default function CourseContainer({ courseInfo }: { courseInfo: CourseInfo }) {
  const [assignments, setAssignments] = useState<CourseAssignment[]>();
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
  }, [courseInfo]);

  // Return component
  return (
    <VStack paddingLeft="3" alignItems="flex-start">
      {/* Show course information */}
      <Text paddingTop="3" fontSize="4xl" fontFamily="Montserrat, sans-serif" fontWeight="bold">
        {courseInfo.name}
      </Text>
      <Text marginTop="0 !important" fontSize="lg" fontFamily="Montserrat, sans-serif" fontWeight="regular">
        {courseInfo.instructor} - {courseInfo.tag} {courseInfo.num} - Fall '21
      </Text>
      <Text fontSize="sm" fontFamily="Montserrat, sans-serif" fontWeight="regular">
        ({courseInfo.start} - {courseInfo.end})
      </Text>

      <Divider />

      {/* Show assignments for this class */}
      <AssignmentsContainer courseAssignments={(assignments as CourseAssignment[])} />
    </VStack>
  )
}
