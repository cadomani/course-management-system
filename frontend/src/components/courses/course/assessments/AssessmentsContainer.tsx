// Libraries
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

// Views
import AssessmentItem from './AssessmentItem';

// Chakra
import {
  Box,
  Spacer,
  Stack,
  Text,

} from '@chakra-ui/react';

// Types
import { Enrollment } from '../../../../shared/types'

/**
 * Custom view for the assessments page
 */
export default function AssessmentsContainer() {

  // Return component
  return (
    <></>
    // <Stack align="stretch" >
    //   <Text fontSize="xl" fontFamily="Montserrat, sans-serif" fontWeight="regular">Assignments:</Text>
    //   {courseAssignments && (courseAssignments).map((data: any, index: number) => {
    //     return <StudentAssignmentItem
    //       key={index}
    //       courseAssignment={data}
    //     />
    //   })}
    // </Stack>
  )
}
