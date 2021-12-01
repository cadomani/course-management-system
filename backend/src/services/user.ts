import prisma from '@shared/Database';
import logger from '@shared/Logger';
import {
  ResponseFormat
} from '../schemas/user';


// ORM convenience mapping
const User = prisma.profile;
const Student = prisma.student;

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


export async function getStudentAssignments(userId: number, courseId: number) {
 let data: any;
  data = await prisma.enrollment.findFirst({  
    where: {
      AND: {
        student: {
          profile_id: userId
        },
        section_id: courseId,
      }
    },
    select: {
      assignment: true
    }
  })

  // Send success in either case
  return {
    status: 200,
    data: (typeof data === null || Object.keys(data.assignment).length == 0) ? {} : data,
  };
}

export async function getStudentAnnouncements(userId: number, courseId: number) {
  let data: any;
   data = await prisma.enrollment.findFirst({  
     where: {
       AND: {
         student: {
           profile_id: userId
         },
         section_id: courseId,
       }
     },
     select: {
       messaging: true
     }
   })
   console.log(data);
   // Send success in either case
   return {
     status: 200,
     data: (typeof data === null || Object.keys(data.messaging).length == 0) ? {} : data,
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
