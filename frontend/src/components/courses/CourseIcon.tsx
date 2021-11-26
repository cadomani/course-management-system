// Chakra
import {
  VStack,
  Box,
  Button,
  Tooltip
} from '@chakra-ui/react';

// Types
import { StudentEnrollment } from '../../shared/types';

/**
 * An icon for a single course taken by this student
 */
export default function CourseIcon( { index, course, activeCourse }: { index: number, course: StudentEnrollment, activeCourse: any }): JSX.Element {
  return (
    <Tooltip
      key={course.id}
      label={(<>
        <div>
          <strong>
            {course.name}
          </strong>
        </div>
        {course.instructor.name}
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
        colorScheme={[
            'purple',
            'yellow',
            'pink',
            'green',
            'red',
            'teal',
            'blue'
          ][index]
        }
        variant="solid"
        textAlign="center"
        onClick={() => activeCourse(course)}
      >
        <VStack>
          <Box>
            <strong>{course.tag.split(" ")[0]}</strong>
          </Box>
          <Box marginTop="0px !important">
            {course.tag.split(" ")[1]}
          </Box>
        </VStack>
      </Button>
    </Tooltip>
  )
}
