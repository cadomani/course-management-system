// Views
import { StudentAssignmentItem } from './AssignmentItem';

// Chakra
import {
  Stack,
  Text
} from "@chakra-ui/react"

// Types
import { CourseAssignment } from '../../../../shared/types'

/**
 * Custom view for the assignments page
 */
export default function AssignmentsContainer({courseAssignments}: {courseAssignments: CourseAssignment[]}): JSX.Element {
  // Return component
  return (
    <Stack align="flex-start" width="100%" padding="0px 10px 0px 10px">
      <Text fontSize="xl" fontFamily="Montserrat, sans-serif" fontWeight="regular">Assignments:</Text>
      {courseAssignments && (courseAssignments).map((data: CourseAssignment, index: number) => {
        return <StudentAssignmentItem
          key={index}
          courseAssignment={data}
        />
      })}
    </Stack>
  )
}
