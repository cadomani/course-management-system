import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import CoursesContainer from './courses/CoursesContainer';
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

const DOMAIN = import.meta.env.VITE_MOCK_SERVER;

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
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(
    [
      {
        "id": 425,
        "name": "Handcrafted Rubber Hat",
        "courseId": "bass 235",
        "instructor": "Dariana Kassulke",
        "start": "Sat Jul 24 2021 06:35:23 GMT+0000 (Coordinated Universal Time)",
        "end": "Fri Apr 29 2022 09:10:39 GMT+0000 (Coordinated Universal Time)",
      }, {
        "id": 409,
        "name": "Unbranded Frozen Towels",
        "courseId": "syst 332",
        "instructor": "Magnolia Dickinson",
        "start": "Wed Dec 09 2020 00:07:09 GMT+0000 (Coordinated Universal Time)",
        "end": "Sat Feb 05 2022 09:32:27 GMT+0000 (Coordinated Universal Time)",
      }, {
        "id": 645,
        "name": "Awesome Fresh Cheese",
        "courseId": "sens 794",
        "instructor": "Amber Fisher",
        "start": "Sat Oct 02 2021 00:18:25 GMT+0000 (Coordinated Universal Time)",
        "end": "Sat Oct 08 2022 10:21:36 GMT+0000 (Coordinated Universal Time)",
      }, {
        "id": 862,
        "name": "Intelligent Rubber Chicken",
        "courseId": "cart 510",
        "instructor": "Ollie Harvey",
        "start": "Wed Aug 18 2021 19:07:04 GMT+0000 (Coordinated Universal Time)",
        "end": "Mon Jul 25 2022 13:28:46 GMT+0000 (Coordinated Universal Time)",
      }, {
        "id": 335,
        "name": "Generic Wooden Hat",
        "courseId": "ramp 424",
        "instructor": "Kelly Treutel",
        "start": "Tue Aug 24 2021 23:11:10 GMT+0000 (Coordinated Universal Time)",
        "end": "Thu Jul 28 2022 01:43:48 GMT+0000 (Coordinated Universal Time)",
      }
    ]
  );
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
  // Request all courses from user on load
  // useEffect(() => {
  //   (async function getEnrollments() {
  //     await axios.get(`${DOMAIN}/api/user/${userId}/enrollment`)
  //       .then(function (response) {
  //         // Handle success (200 OK)
  //         setActiveCourse(response.data);
  //         console.log(activeCourse)
  //       })
  //       .catch(function (error) {
  //         // Handle failure
  //         setErrorToast({
  //           title: "API Error",
  //           description: "Cannot connect to backend",
  //           status: "error",
  //           position: "top",
  //           isClosable: false
  //         })
  //       });
  //   })();
  // }, [])

  // TODO: Verify login status and redirect to login page
  useEffect(() => {
    return;
    navigate("/login", { replace: true });
  }, [])

  return (
    <>
      {/* Top Bar */}
      <NavigationBar />
      
      {/* Left-side courses bar */}
      {/* direction="column" alignItems="center" justifyContent="center" height="93vh" width="100vw" borderRight="2px" borderColor="rgb(226, 232, 240)" */}
      <Flex width="100vw">
        <Flex direction="column" flex={1} height="92.9vh" width="inherit" alignItems="flex-start">
          <CoursesContainer key={1} enrollment={enrollments} activeCourse={ setActiveCourse }/>

          <Spacer />
          <Divider/>

          <ProfileButton userId={ userId } navigationRequest={ setRedirect }/>
        </Flex>

        <Flex width="95vw" backgroundColor="white" >
          <CourseContainer />
          
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
