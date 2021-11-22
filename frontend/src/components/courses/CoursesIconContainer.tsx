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
        let section = data.tag.split(" ");
        // This may not be needed, send full course and access things inside
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
