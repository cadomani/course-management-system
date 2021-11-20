
// Libraries
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { IoHappyOutline, IoSchool } from "react-icons/io5";

// Views
import CoursesIconContainer from './courses/CoursesIconContainer';
import CourseContainer from './courses/course/CourseContainer';
import ProfileContainer from './profile/ProfileContainer';

// Types
import { Enrollment, DOMAIN } from '../shared/types'

// Chakra
import {
  Heading,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Box,
  Icon,
  IconButton,
  useToast,
  UseToastOptions,
  VStack,
  Square,
  Flex,
  Divider,
  Spacer,
  HStack,
  Grid
} from "@chakra-ui/react"


/**
 * Main view after login. Every element should be accessible directly from here or through here.
 */
export default function DashboardPage({ userId }: { userId: number }): JSX.Element {
  const [errorToast, setErrorToast] = useState<UseToastOptions>();
  const [enrollments, setEnrollments] = useState<Enrollment[]>();
  const [activeCourse, setActiveCourse] = useState<any>();
  const [redirectRequest, setRedirectRequest] = useState<string>();
  const [activeView, setActiveView] = useState<JSX.Element>(<></>);
  const navigate = useNavigate();

  // Handle error toast notifications
  const toast = useToast();
  useEffect(() => {
    if (typeof errorToast !== 'undefined') {
      (() =>
        toast(errorToast)
      )();
    }
  }, [errorToast])

  // A component-level redirect handler
  const setRedirect = (redirectPath: string) => {
    if (typeof redirectPath !== 'undefined' && redirectPath !== '') {
      setActiveView(<ProfileContainer />)
      // navigate(redirectPath, { replace: false })
    }
  }

  // Retrieve fake course enrollments from server
  useEffect(() => {
    (async function getEnrollments() {
      await axios.get(`${DOMAIN}/api/user/${userId}/enrollments/v2`)
        .then(function (res) {
          // Handle success (200 OK)
          setActiveCourse(res.data[0])
          setEnrollments(res.data)
          // processEnrollments({
          //   enrollments: res.data,
          //   setEnrollments: setEnrollments
          // })
        })
        .catch(function (err) {
          // Handle failure
          setErrorToast({
            title: "API Error",
            description: "Cannot connect to backend",
            status: "error",
            position: "top",
            isClosable: false
          })
        });
    })();
  }, []);

  // TODO: Verify login status and redirect to login page
  useEffect(() => {
    // navigate("/login", { replace: true });
  }, [])


  // Switch active view when courses roll in
  useEffect(() => {
    if (typeof enrollments !== 'undefined' && enrollments.length > 1) {
      setActiveView(
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
        {/* <Box width="5%" height="inherit"> */}
          <Flex direction="column" height="100%" alignItems="center" justifyContent="space-between" padding="25px 0px 10px 20px">
            {activeView}

            <Spacer />
            <Divider />
            <ProfileButton userId={userId} navigationRequest={setRedirect} />

          </Flex>

        {/* </Box> */}

        {/* Main Course View */}
        <Box width="95%" paddingLeft="20px">
          {typeof activeCourse !== 'undefined' && typeof enrollments !== 'undefined' && <CourseContainer courseInfo={activeCourse} />}
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


// function processEnrollments({ enrollments, setEnrollments }: { enrollments: any, setEnrollments: any }) {
//   console.log(enrollments);
//   setEnrollments(enrollments);
// }
