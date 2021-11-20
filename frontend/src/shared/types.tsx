// Root domain
export const DOMAIN = import.meta.env.VITE_DOMAIN;

// User -> Enrollment
export type Enrollment = {
  id: number
  name: string
  courseId: string
  instructor: string
  start: string
  end: string
}

// User -> Login
export type Credentials = {
  name: string
  password: string
  email: string
}

// User -> Registration
export type MajorSelection = {
  majorId: number
  sections: number[]
}

// User -> Courses
export type CourseInfo = {
  id: number
  name: string
  tag: string
  instructor: string
  start: string
  end: string
  num: string
}

// Student -> CourseAssignment
export type CourseAssignment = {
  title: string
  description: string
  isComplete: boolean
  dueDate: string
}

// Student -> CourseAnnouncement
export type CourseAnnouncement = {
  title: string
  description: string
  announcementDate: string
}
