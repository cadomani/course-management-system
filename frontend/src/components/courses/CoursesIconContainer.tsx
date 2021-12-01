// Views
import CourseIcon from './CourseIcon';

// Chakra
import {
  Box,
  Spacer
} from '@chakra-ui/react';

// Types
import { StudentEnrollment } from '../../shared/types'

/**
 * Lays out all the courses being taken by this student
 */
export default function CoursesIconContainer({enrollment, activeCourse}: {enrollment : StudentEnrollment[], activeCourse: any}) {
  // Return component
  return (
    <>
      {enrollment.map((data: StudentEnrollment, i: number) => {
        return (
          <Box key={i}>
            <CourseIcon
              index={i}
              course={data}
              activeCourse={ activeCourse }
            />
            <Spacer />
          </Box>
        )
      })}
    </>
  )
}
