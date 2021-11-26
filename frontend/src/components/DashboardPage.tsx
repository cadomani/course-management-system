
// Libraries
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IoHappyOutline, IoSchool } from "react-icons/io5";

// Views
import CoursesIconContainer from './courses/CoursesIconContainer';
import CourseContainer from './courses/course/CourseContainer';
import ProfileContainer from './profile/ProfileContainer';

// Types
import { StudentEnrollment } from '../shared/types'
import { BackendAuthenticationToast, BackendBadRequestToast, BackendConnectionToast, BackendParseErrorToast, getEnrollments } from '../shared/common'

// Chakra
import {
  Heading,
  Box,
  Icon,
  IconButton,
  useToast,
  Flex,
  Divider,
  Spacer,
  HStack,
} from "@chakra-ui/react"


/**
 * Main view after login. Every element should be accessible directly from here or through here.
 */
export default function DashboardPage({ userId }: { userId: number }): JSX.Element {
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>();
  const [activeCourse, setActiveCourse] = useState<StudentEnrollment>();
  const [iconView, setIconView] = useState<JSX.Element>();
  const navigate = useNavigate();
  const toast = useToast();

  // A component-level redirect handler
  const setRedirect = (redirectPath: string) => {
    if (typeof redirectPath !== 'undefined' && redirectPath !== '') {
      setIconView(<ProfileContainer />)
    }
  }

  // Retrieve course enrollments from server
  useEffect(() => {
    (async () => {
      const res = await getEnrollments(userId)
      if (typeof res !== 'undefined') {
        if (res.success) {
          setActiveCourse(res.data[0]);
          setEnrollments(res.data);
        } else {
          if (res.data == "parseError") {
            toast(BackendParseErrorToast);
          } else if (res.data == "authenticationError") {
            toast(BackendAuthenticationToast)
            navigate("/login", { replace: true })
          } else {
            toast(BackendBadRequestToast)
          }
        }
      } else {
        toast(BackendConnectionToast)
      }
    })();
  }, []);

  // Switch active view when courses roll in
  useEffect(() => {
    // Guard against early run
    if (typeof enrollments !== 'undefined' && enrollments.length > 1) {
      setIconView(
        <CoursesIconContainer
          key={1}
          enrollment={enrollments}
          activeCourse={setActiveCourse}
        />)
    }
  }, [enrollments])

  return (
    <>
      {/* Top Bar */}
      <NavigationBar />

      {/* Left-side courses bar */}
      <Flex direction="row" height="92.9vh" alignItems="flex-start" flexWrap="nowrap" justifyContent="center">
        {/* Course Icons View */}
        <Flex direction="column" height="100%" alignItems="center" justifyContent="space-between" padding="25px 0px 10px 20px">
          {iconView}

          <Spacer />
          <Divider />
          <ProfileButton userId={userId} navigationRequest={ setRedirect } />

        </Flex>

        {/* Main Course View */}
        <Box width="95%" paddingLeft="20px">
          {typeof activeCourse !== 'undefined' && typeof enrollments !== 'undefined' && <CourseContainer course={ activeCourse } />}
        </Box>
      </Flex>
    </>
  )
}

/**
 * Top navigation bar.
 * Contains app title and icon.
 */
function NavigationBar(): JSX.Element {
  return (
    <>
      <Flex bg="orange.300" height="7vh" alignItems="center">
        <Box p="3">
          <HStack>
            <Icon as={IoSchool} boxSize={5} color="white" />
            <Heading color="white" size="md">Course Management System</Heading>
          </HStack>
        </Box>
      </Flex>
      <Divider />
    </>
  )
}

/**
 * Bottom-left profile icon.
 * Leads to profile viewer/editor
 */
function ProfileButton({ userId, navigationRequest }: { userId: number, navigationRequest: any }): JSX.Element {
  return (
      <IconButton
        aria-label="Profile"
        colorScheme="orange"
        size="lg"
        isRound={true}
        variant="outline"
        marginTop="10px"
        icon={<IoHappyOutline />}
        onClick={() => navigationRequest(`/user/profile`)}
      />
  )
}
