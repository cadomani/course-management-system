// Views
import StudentAnnouncementItem from './AnnouncementItem';

// Chakra
import {
  Stack,
  Text,
} from '@chakra-ui/react';

// Types
import { CourseAnnouncement } from '../../../../shared/types'

/**
 * Custom view for the announcements page
 */
export default function AnnouncementsContainer({ courseAnnouncements }: { courseAnnouncements: CourseAnnouncement[] }) {
  return (
    <Stack align="stretch" width="100%" padding="0px 20px 0px 10px">
      <Text fontSize="xl" fontFamily="Montserrat, sans-serif" fontWeight="regular">Announcements:</Text>
      {courseAnnouncements && (courseAnnouncements).map((data: CourseAnnouncement, index: number) => {
        return <StudentAnnouncementItem
          key={index}
          courseAnnouncement={data}
        />
      })}
    </Stack>
  )
}
