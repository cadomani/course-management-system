
// Libraries
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { IoSchool } from "react-icons/io5";

// Views
import CoursesIconContainer from './courses/CoursesIconContainer';
import CourseContainer from './courses/course/CourseContainer';
import ProfileContainer from './profile/ProfileContainer';

// Types
import { StudentEnrollment, StudentProfile } from '../shared/types'
import { BackendAuthenticationToast, BackendBadRequestToast, BackendConnectionToast, BackendParseErrorToast, getEnrollments, getStudentProfile } from '../shared/common'

// Chakra
import {
  Heading,
  Box,
  Icon,
  useToast,
  Flex,
  Divider,
  Spacer,
  HStack,
  Avatar,
} from "@chakra-ui/react"


/**
 * Main view after login. Every element should be accessible directly from here or through here.
 */
export default function DashboardPage(): JSX.Element {
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>();
  const [studentProfile, setStudentProfile] = useState<StudentProfile>();
  const [activeCourse, setActiveCourse] = useState<StudentEnrollment>();
  const [activeLeftPanelView, setActiveLeftPanelView] = useState<JSX.Element>();
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams()
  
  // Retrieve student profile and course enrollments from server
  useEffect(() => {
    (async () => {
      if (typeof params !== 'undefined' && typeof params.userId !== 'undefined') {
        const res = await getStudentProfile(Number.parseInt(params.userId))
        if (typeof res !== 'undefined') {
          if (res.success) {
            setStudentProfile(res.data[0]);
          } else {
            navigate("/login", { replace: true })
          }      
        }
      } else {
        navigate("/login", { replace: true })
      }
    })();

    (async () => {
      if (typeof params !== 'undefined' && typeof params.userId !== 'undefined') {
        const res = await getEnrollments(Number.parseInt(params.userId));
        if (typeof res !== 'undefined') {
          if (res.success) {
            setActiveCourse(res.data[0]);
            setEnrollments(res.data);
          } else {
            if (res.data == "parseError") {
              toast(BackendParseErrorToast);
            } else if (res.data == "authenticationError") {
              toast(BackendAuthenticationToast)
            } else {
              toast(BackendBadRequestToast)
            }
            navigate("/login", { replace: true })
          }
        } else {
          toast(BackendConnectionToast)
          navigate("/login", { replace: true })
        }
      }
    })();
  }, []);

  // Switch active view when courses roll in
  useEffect(() => {
    // Guard against early run
    if (typeof enrollments !== 'undefined' && enrollments.length > 1) {
      setActiveLeftPanelView(
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
          {activeLeftPanelView}

          <Spacer />
          <Divider />
          <Avatar 
            name={studentProfile?.name || ""} 
            iconLabel="Profile" 
            src="" 
            marginTop="10px" 
            onClick={() => setActiveLeftPanelView(<ProfileContainer userInfo={ studentProfile } />)} 
          />
        </Flex>

        {/* Main Course View */}
        <Box width="95%" paddingLeft="20px"> 
          {
            typeof activeCourse !== 'undefined' 
            && typeof enrollments !== 'undefined' 
            && typeof params !== 'undefined' 
            && typeof params.userId !== 'undefined' 
            && <CourseContainer course={ activeCourse } user={ Number.parseInt(params.userId) } />
          }
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
