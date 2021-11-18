import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import CoursesIconContainer from './courses/CoursesIconContainer';
import CourseContainer from './courses/course/CourseContainer';
import { IoHappyOutline, IoSchool } from "react-icons/io5";
import {
  Heading,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Box,
  Icon,
  IconButton,
  FormErrorMessage,
  FormHelperText,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
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

const DOMAIN = import.meta.env.VITE_DOMAIN;

type Enrollment = {
  id: number
  name: string
  courseId: string
  instructor: string
  start: string
  end: string
}

/**
 * Main view after login. Every element should be accessible directly from here or through here.
 */
export default function DashboardPage({ userId }: { userId: number }): JSX.Element {
  const [errorToast, setErrorToast] = useState<UseToastOptions>();
  const [enrollments, setEnrollments] = useState<Enrollment[]>();
  const [activeCourse, setActiveCourse] = useState<any>();
  const [redirectRequest, setRedirectRequest] = useState<string>();
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
      // navigate(redirectPath, { replace: false })
    }
  }

  // Retrieve fake course enrollments from server
  useEffect(() => {
    (async function getEnrollments() {
      await axios.get(`${DOMAIN}/api/user/${userId}/enrollments`)
        .then(function (res) {
          // Handle success (200 OK)
          setActiveCourse(res.data[0])
          setEnrollments(res.data)
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

  return (
    <>
      {/* Top Bar */}
      <NavigationBar />
      
      {/* Left-side courses bar */}
      <Flex width="100vw">
        <Flex direction="column" flex={1} height="92.9vh" width="inherit" alignItems="flex-start">
          {typeof enrollments !== 'undefined' && enrollments.length > 0 && <CoursesIconContainer key={1} enrollment={enrollments} activeCourse={setActiveCourse} />}
    
          <Spacer />
          <Divider/>

          <ProfileButton userId={ userId } navigationRequest={ setRedirect }/>
        </Flex>

        <Flex width="95vw" backgroundColor="white" justifyContent="flex-start">
          {typeof activeCourse !== 'undefined' && typeof enrollments !== 'undefined' && <CourseContainer courseInfo={activeCourse} />}
          
        </Flex>
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
          <Icon as={IoSchool} boxSize={5} color="white"/>
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
function ProfileButton({ userId, navigationRequest }: { userId: number, navigationRequest : any }): JSX.Element {
  return (
    <IconButton
      aria-label="Profile"
      colorScheme="orange"
      size="lg"
      isRound={true}
      variant="outline"
      margin="10px"
      icon={<IoHappyOutline />}
      onClick={() => navigationRequest(`/user/profile`)}
    />
  )
}
