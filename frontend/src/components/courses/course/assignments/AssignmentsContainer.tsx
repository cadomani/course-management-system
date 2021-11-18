import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { StudentAssignmentItem } from './AssignmentItem';
import { Stack } from "@chakra-ui/react"
const DOMAIN = import.meta.env.VITE_DOMAIN;
type Assignment = {
  title: string
  description: string
}

/**
 * Custom view for the assignments page
 */
export default function AssignmentsContainer({courseAssignments}: {courseAssignments: Assignment[]}) {


 

  // Return component
  return (
    <>
      <Stack>
        <h1> Assignments </h1>
        <StudentAssignmentItem
        title='Discussion Post 1'
        description='Description 1'/>
        <StudentAssignmentItem
        title='Discussion Post 2'
        description='Description 2'/>
        <StudentAssignmentItem
        title='Discussion Post 3'
        description='Description 3'/>
      </Stack>
    </>
  )
}
