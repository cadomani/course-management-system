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

export async function getCourseAnnouncements(userId: number) {
  let data: any;
  let assignments: CourseAnnouncement[]

  // data = await prisma.student.findFirst({  
  //   where: {
  //     profile_id: userId
  //   },
  //   select: {
  //     enrollment: {
  //       select: {
  //         an: {
  //           select: {
  //             id: true,
  //             uuid: true,
  //             title: true,
  //             content: true,
  //             points: true,
  //             possible: true,
  //             submission_date: true,
  //             due_date: true
  //           }
  //         }
  //       }
  //     }
  //   }
  // })

  // for (var i = 0; i < amount; i++) {
  //   assignments.push({
  //     title: faker.commerce.productName(),
  //     description: faker.commerce.productDescription(),
  //     dueDate: faker.date.soon(15, new Date()).toLocaleDateString('en-US')
  //   })
  // }

  return data;
}

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
