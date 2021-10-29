import prisma from '@shared/Database'; 
import logger from '@shared/Logger';

// ORM convenience mapping
const Course = prisma.course;

/**
 * DEBUG: List all users in the database
 * Access: Restricted
 * @param {*} options 
 * @returns 
 */
export async function listCourses(options: any) {
  
  const data = await Course.findMany();
  if (!data) {
    throw new Error('Data not found in database.');
  }
  const status = 200;

  return {
    status,
    data,
  };
}

/**
 * Create a new course
 * Access: Restricted
 * @param {*} options 
 * @returns 
 */
export async function createCourse(options: any) {
  const data = {
    status: '<string>',
    detail: '<string>',
  };
  const status = 201;

  return {
    status,
    data,
  };
}

/**
 * Replace a course
 * Access: Restricted
 * @param {*} options 
 * @returns 
 */
export async function replaceCourse(options: any) {
  const data = {
    status: '<string>',
    detail: '<string>',
  };
  const status = 200;

  return {
    status,
    data,
  };
}

/**
 * Update a course
 * Access: Restricted
 * @param {*} options 
 * @returns 
 */
export async function updateCourse(options: any) {
  const data = {
    status: '<string>',
    detail: '<string>',
  };
  const status = 200;

  return {
    status,
    data,
  };
}
