// Libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Views
import AssignmentsContainer from './assignments/AssignmentsContainer';
import AnnouncementsContainer from './announcements/AnnouncementsContainer';

// Chakra
import { useToast } from '@chakra-ui/toast';
import { VStack, HStack, Text, Divider } from '@chakra-ui/layout';

// Types & Common
import { CourseAssignment, CourseAnnouncement, StudentEnrollment } from '../../../shared/types';
import { BackendConnectionToast, BackendBadRequestToast, BackendAuthenticationToast, getCourseDeliverables, dateToHumanReadable } from '../../../shared/common';

/**
 * Root view when accessing a course. Becomes a launching point for modules, assignments, assessments, syllabus, and more.
 */
export default function CourseContainer({ course, user }: { course: StudentEnrollment, user: number }) {
  const [assignments, setAssignments] = useState<CourseAssignment[]>();
  const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>();
  const toast = useToast();
  const navigate = useNavigate();

  // Retrieve assignments and assessments using a common handler
  useEffect(() => {
    const init = async (context: string, setter: any) => {
      const resAssignments = await getCourseDeliverables(course.id, user, context);
      if (typeof resAssignments !== 'undefined') {
        if (resAssignments.success) {
          setter(resAssignments.data);
        } else {
          if (resAssignments.data == 'authenticationError') {
            toast(BackendAuthenticationToast);
            navigate('/login', { replace: true });
          } else {
            toast(BackendBadRequestToast);
          }
        }
      } else {
        toast(BackendConnectionToast);
      }
    };

    // Pull assignments
    init('assignments', setAssignments);

    //Pull announcements
    init('announcements', setAnnouncements);
  }, [,course]);

  // Return component
  return (
    <div>
      <VStack alignContent="center">
        {/* Show course information */}
        <Text paddingTop="3" fontSize="4xl" fontFamily="Montserrat, sans-serif" fontWeight="bold">
          {course.name}
        </Text>
        <Text marginTop="0 !important" fontSize="lg" fontFamily="Montserrat, sans-serif" fontWeight="regular">
          {course.instructor.name} - {course.tag} {course.building} - Fall '21
        </Text>
        <Text fontSize="sm" fontFamily="Montserrat, sans-serif" fontWeight="regular" paddingBottom="15px">
          {`(${dateToHumanReadable(course.sectionStart)} - ${dateToHumanReadable(course.sectionEnd)})`}
        </Text>

        <Divider />
      </VStack>
      <HStack alignItems="flex-start" w="100%" padding="20px 0px 15px 0px">
        <VStack w="80%">
          {/* Show assignments for this class */}
          <AssignmentsContainer courseAssignments={assignments as CourseAssignment[]} />
        </VStack>
        <VStack w="20%">
          {/* Announcements View */}
          <AnnouncementsContainer courseAnnouncements={announcements as CourseAnnouncement[]} />
        </VStack>
      </HStack>
    </div>
  );
}
