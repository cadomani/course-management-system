import { Prisma } from '@prisma/client';
import prisma from '@shared/Database';
import logger from '@shared/Logger';
import {
  ProfileIdentity,
  UpdateProfile,
  QualifiedProfile,
  NonQualifiedProfile,
  ResponseFormat
} from '../schemas/user';
import faker, { fake } from 'faker';


// ORM convenience mapping
const User = prisma.profile;
const Student = prisma.student;
const Enrollment = prisma.enrollment;

// Types
type EnrollmentData = {
  id: number
  name: string
  courseId: string
  instructor: string
  start: string
  end: string
}

type EnrollmentDataV2 = {
  id: number
  name: string
  tag: string
  schedule: string
  creditHours: string,
  courseStart: string
  courseEnd: string
  registrationStart: string
  registrationEnd: string
  major: string
  academicYear: number
  term: string
  building: string
  college: string
  room: string
  instructor: {
    name: string,
    university: string,
    college: string
  }
}

export type StudentProfile = {
  id: number
  name: string
  major: string
  email: string
  biography: string
  university: string
  photo: string
}

// Fake Information
export async function generateFakeEnrollment(amount: number) {
  let enrollments: EnrollmentData[] = []
  for (var i = 0; i < amount; i++) {
    enrollments.push({
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      instructor: faker.name.findName(),
      courseId: `${faker.hacker.abbreviation()} ${faker.datatype.number()}`,
      start: faker.date.recent(3, '08-16-2021').toLocaleDateString('en-US'),
      end: faker.date.recent(5, '12-7-2021').toLocaleDateString('en-US')
    })
  }
  return enrollments;
}

export async function getStudentEnrollment(userId: number) {
  let data: any;
  data = await Student.findFirst({
    where: {
      profile_id: userId 
    },
    select: {
      enrollment: {
        select: {
          section: {
            select: {
              id: true,
              availability: {
                select: {
                  course: {
                    select: {
                      name: true,
                      credit_hours: true,
                      major: {
                        select: {
                          name: true
                        }
                      }
                    }
                  },
                  academic_year: true,
                  term: true,
                  registration_start: true,
                  registration_end: true
                }
              },
              instructor: {
                select: {
                  profile: {
                    select: {
                      name: true,
                      university: true
                    }
                  },
                  department: {
                    select: {
                      college: {
                        select: {
                          name: true       
                        }
                      },
                    }
                  }
                }
              },
              building: {
                select: {
                  name: true,
                  college: {
                    select: {
                      name: true
                    }
                  },
                },
              },
              section_start: true,
              section_end: true,
              course_tag: true,
              schedule: true,
              room_num: true
            }
          }
        }
      }
    }
  });

  // Send success in either case
  return {
    status: 200,
    data: (typeof data === null || Object.keys(data.enrollment).length == 0) ? {} : data.enrollment,
  };
}


export async function getStudentAssignments(userId: number) {
 let data: any;
  data = await Student.findFirst({  
    where: {
      profile_id: userId
    },
    select: {
      enrollment: {
        select: {
          assignment: {
            select: {
              id: true,
              uuid: true,
              content_type: true,
              points: true,
              possible: true,
              due_date: true
            }
          }
        }
      }
    }
  })

  // Send success in either case
  return {
    status: 200,
    data: (typeof data === null || Object.keys(data.enrollment).length == 0) ? {} : data.enrollment,
  };
}

/**
 * Retrieve the user profile
 */
export async function getUserProfile(id: number): Promise<ResponseFormat> {
  // Obtain data for profiles
  // TODO: Unstable behavior - type predicates don't seem to work when interfaces contain the same properties
  let data;
  data = await User.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      biography: true,
      university: true,
      photo: true,
      student: {
        select: {
          major: true
        }
      }
    }
  });

  // Send success in either case
  return {
    status: 200,
    data: (data === null || Object.keys(data).length == 0) ? {} : data,
  };
}

/**
 * Update the user profile
 */
export async function updateUserProfile(options: any): Promise<ResponseFormat> {
  // Create the base profile from options
  let newProfile: Prisma.profileUpdateInput = {
    name: options.name,
    biography: options.biography,
  };

  const data = await User.update({
    where: {
      id: options.id
    },
    data: newProfile
  })

  return {
    status: 200,
    data: {
      publicId: data.id,
    },
  };
}


/**
* Replace public profile photo of a user
*/
export async function getUserProfilePhoto(options: string) {
  // Check for presence of UUID header
  if (options == undefined) {
    logger.err('This resource cannot be retrieved.');
    return {
      status: 400,
      data: "This resource cannot be retrieved."
    };
  }

  const data = {};
  const status = 200;

  return {
    status,
    data,
  };
}

/**
* Replace public profile photo of a user
*/
export async function replaceUserProfilePhoto(options: string) {
  // Check for presence of UUID header
  if (options === undefined) {
    logger.err('This resource cannot be retrieved');
    return {
      status: 400,
      data: "This resource cannot be retrieved."
    };
  }
  const data = {};
  const status = 200;

  return {
    status,
    data,
  };
}

