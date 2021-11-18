import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { StudentAssignmentItem, CourseAssignment } from './AssignmentItem';
import { Stack, Text } from "@chakra-ui/react"
const DOMAIN = import.meta.env.VITE_DOMAIN;


/**
 * Custom view for the assignments page
 */
export default function AssignmentsContainer({courseAssignments}: {courseAssignments: CourseAssignment[]}): JSX.Element {
  // Return component
  return (
    <>
      <Stack align="stretch" >
        <Text fontSize="xl" fontFamily="Montserrat, sans-serif" fontWeight="regular">Assignments:</Text>
        {courseAssignments && (courseAssignments).map((data: any, index: number) => {
          return <StudentAssignmentItem
            key={index}
            courseAssignment={data}
          />
        })}
      </Stack>
    </>
  )
}
