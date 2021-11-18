import prisma from '@shared/Database'; 
import logger from '@shared/Logger';
import faker, { fake } from 'faker';

// ORM convenience mapping
const Course = prisma.course;

// Types
export type CourseAssignment = {
  title: string
  description: string
  isComplete: boolean
  dueDate: string
}

export async function generateFakeAssignments(amount: number) {
  let assignments: CourseAssignment[] = []
  for (var i = 0; i < amount; i++) {
    assignments.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      isComplete: faker.datatype.boolean(),
      dueDate: faker.date.soon(15, new Date()).toLocaleDateString('en-US')
    })
  }

  return assignments;
}

// /**
//  * DEBUG: List all users in the database
//  * Access: Restricted
//  * @param {*} options 
//  * @returns 
//  */
// export async function listCourses(options: any) {
  
//   const data = await Course.findMany();
//   if (!data) {
//     throw new Error('Data not found in database.');
//   }
//   const status = 200;

//   return {
//     status,
//     data,
//   };
// }

// /**
//  * Create a new course
//  * Access: Restricted
//  * @param {*} options 
//  * @returns 
//  */
// export async function createCourse(options: any) {
//   const data = {
//     status: '<string>',
//     detail: '<string>',
//   };
//   const status = 201;

//   return {
//     status,
//     data,
//   };
// }

// /**
//  * Replace a course
//  * Access: Restricted
//  * @param {*} options 
//  * @returns 
//  */
// export async function replaceCourse(options: any) {
//   const data = {
//     status: '<string>',
//     detail: '<string>',
//   };
//   const status = 200;

//   return {
//     status,
//     data,
//   };
// }

// /**
//  * Update a course
//  * Access: Restricted
//  * @param {*} options 
//  * @returns 
//  */
// export async function updateCourse(options: any) {
//   const data = {
//     status: '<string>',
//     detail: '<string>',
//   };
//   const status = 200;

//   return {
//     status,
//     data,
//   };
// }
