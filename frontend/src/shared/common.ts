// Libraries
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

// Chakra
import {
  useToast,
  UseToastOptions
} from "@chakra-ui/react"

// Types
import { StudentEnrollment, StudentProfile, DOMAIN } from '../shared/types'


// Toasts
export const BackendConnectionToast: UseToastOptions = {
  title: "API Error",
  description: "Cannot connect to backend.",
  status: "error",
  position: "top",
  isClosable: false
}

export const BackendAuthenticationToast: UseToastOptions = {
  title: "Authentication Warning",
  description: "Please log in before making that request.",
  status: "warning",
  position: "top",
  isClosable: false
}

export const BackendParseErrorToast: UseToastOptions = {
  title: "Parse Error",
  description: "The backend is live, but the data could not be parsed.",
  status: "error",
  position: "top",
  isClosable: false
}

export const BackendBadRequestToast: UseToastOptions = {
  title: "Request Error",
  description: "The backend is live, but the server did not understand the request.",
  status: "error",
  position: "top",
  isClosable: false
}

export const AssignmentSubmissionToast: UseToastOptions = {
  title: 'Assignment submitted!',
  description: 'Instructor has been notified of your assignment submission.',
  status: 'success',
  isClosable: true,
  position: 'bottom'
}

// App
export async function getStudentProfile(userId: number): Promise<any> {
  return await axios.get(`${DOMAIN}/api/user/${userId}/profile`)
    .then(function (res) {
      // Process incoming data
      try {
        let studentProfile: StudentProfile = {
          id: res.data.id,
          name: res.data.name,
          major: res.data.student[0].major,
          email: res.data.email,
          biography: res.data.biograpy,
          university: res.data.university,
          photo: res.data.photo
        }
        // Send back parsed data
        return {
          success: true,
          data: studentProfile
        }
      } catch {
        return {
          success: false,
          data: "parseError"
        }
      }
    })
    .catch(function (err) {
      // Handle failure
      console.log(`Axios error retrieving student profile: ${err}`)
      
      // Handle error responses
      if (err.response.status === 401) {
        return {
          success: false,
          data: "authenticationError"
        }
      } else if (err.response.status === 400) {
        return {
          success: false,
          data: "badRequestError"
        }
      } else {
        // Unknown error occurred
        return {
          success: false,
          data: "axiosError"
        }
      } 
    });
}


// Dashboard
export async function getEnrollments(userId: number): Promise<any> {
  return await axios.get(`${DOMAIN}/api/user/${userId}/enrollments`)
    .then(function (res) {
      // Process incoming data
      try {
        let studentEnrollment: StudentEnrollment[] = [];
        for (let x in res.data) {
          studentEnrollment.push({
            id: res.data[x].section.id,
            name: res.data[x].section.availability.course.name,
            creditHours: res.data[x].section.availability.course.credit_hours,
            major: res.data[x].section.availability.course.major.name,
            academicYear: res.data[x].section.availability.academic_year,
            term: res.data[x].section.availability.term,
            registrationStart: new Date(res.data[x].section.availability.registration_start),
            registrationEnd: new Date(res.data[x].section.availability.registration_end),
            sectionStart: new Date(res.data[x].section.section_start),
            sectionEnd: new Date(res.data[x].section.section_end),
            instructor: {
              name: res.data[x].section.instructor.profile.name,
              university: res.data[x].section.instructor.profile.university,
              department: res.data[x].section.instructor.department[0].college.name
            },
            college: res.data[x].section.building.college.name,
            building: res.data[x].section.building.name,
            tag: res.data[x].section.course_tag,
            schedule: res.data[x].section.schedule,
            roomNumber: res.data[x].section.room_num
          })
        }
        // Send back parsed data
        return {
          success: true,
          data: studentEnrollment
        }
      } catch {
        return {
          success: false,
          data: "parseError"
        }
      }
    })
    .catch(function (err) {
      // Handle failure
      console.log(`Axios error retrieving enrollments: ${err}`)

      // Handle error responses
      if (err.response.status === 401) {
        return {
          success: false,
          data: "authenticationError"
        }
      } else if (err.response.status === 400) {
        return {
          success: false,
          data: "badRequestError"
        }
      } else {
        // Unknown error occurred
        return {
          success: false,
          data: "axiosError"
        }
      } 
    });
}

// Course Container
export async function getCourseDeliverables(courseId: number, context: string): Promise<any> {
  return await axios.get(`${DOMAIN}/api/course/${courseId}/${context}`)
    .then(function (res) {
      return {
        success: true,
        data: res.data
      }
    })
    .catch(function (err) {
      // Handle failure
      console.log(`Axios error retrieving assignments: ${err}`)

      // Handle error responses
      if (err.response.status === 401) {
        return {
          success: false,
          data: "authenticationError"
        }
      } else if (err.response.status === 400) {
        return {
          success: false,
          data: "badRequestError"
        }
      } else {
        // Unknown error occurred
        return {
          success: false,
          data: "axiosError"
        }
      } 
    });
}

// Date formatting
export function dateToHumanReadable(date: Date) {
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}
