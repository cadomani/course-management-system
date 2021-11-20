// Libraries
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// Views
import CourseItem from './CourseItem';

// Chakra
import {
  Box,
  Spacer
} from '@chakra-ui/react';

// Types
import { Enrollment } from '../../shared/types'

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
