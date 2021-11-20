// Libraries
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// Chakra
import {
  Square,
  VStack,
  Box,
  Button,
  Tooltip
} from '@chakra-ui/react';

/**
 * Lays out all the courses being taken by this student
 */
export default function CourseItem( { course, activeCourse }: { course: any, activeCourse: any }): JSX.Element {

  // Return component
  return (
    <>
      <Tooltip
        key={course.id}
        label={(<>
          <div>
            <strong>
              {course.name}
            </strong>
          </div>
          {course.instructor}
        </>
        )}
        placement="right"
        openDelay={500}
        hasArrow={true}
      >
        <Button
          rounded="15px"

          height="70px"
          width="70px"
          marginBottom="30px"
          colorScheme={colorFromIndex(course.index)}
          variant="solid"
          textAlign="center"
          onClick={() => activeCourse(course)}
          // onMouseEnter={() => activeCourse(course.id)}
        >
          <VStack>
            <Box>
              <strong>{course.tag}</strong>
            </Box>
            <Box marginTop="0px !important">
              {course.num}
            </Box>
          </VStack>
        </Button>
      </Tooltip>
    </>
  )
}

/**
 * Very basic color-picker based on item index
 * @param index 
 * @returns 
 */
function colorFromIndex(index: number): string {
  return [
    'purple',
    'yellow',
    'pink',
    'green',
    'red',
    'teal',
    'blue'
  ][index]
}
