import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
const DOMAIN = import.meta.env.VITE_DOMAIN;
import CourseItem from './CourseItem';
import { Flex, Box, Spacer, Square, VStack, Divider } from '@chakra-ui/react';
import styles from './courses.css'

type Enrollment = {
  id: number
  name: string
  courseId: string
  instructor: string
  start: string
  end: string
}

export default function CoursesIconContainer({enrollment, activeCourse}: {enrollment : Enrollment[], activeCourse: any}) {

  // Return component
  return (
    <>
      {enrollment.map((data: any, i: number) => {
        let course = data.courseId.split(" ");
        return (
          <Box key={data.id}>
            <CourseItem
              course={{
                id: data.id,
                name: data.name,
                tag: (course[0] as string).toUpperCase(),
                num: course[1],
                instructor: data.instructor,
                start: data.start,
                end: data.end,
                index: i
              }}
              activeCourse={activeCourse}
            />
            <Spacer />
          </Box>
        )
      })}
    </>
  )
}
