import prisma from '@shared/Database'; 
import logger from '@shared/Logger';

// ORM convenience mapping
const Course = prisma.course;

// Types
export type CourseAssignment = {
  title: string
  description: string
  isComplete: boolean
  dueDate: string
}

export type CourseAnnouncement = {
  title: string
  description: string
  announcementDate: string
}
