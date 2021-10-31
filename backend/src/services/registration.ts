import prisma from '@shared/Database';
import logger from '@shared/Logger';
import {
  ResponseFormat
} from '../schemas/user';
import { DateTime } from "luxon";

// ORM convenience mapping
const College = prisma.college;
const Profile = prisma.profile;
const Enrollment = prisma.enrollment;
const Student = prisma.student;

/**
 * Lists colleges and majors along with id's to present during registration.
 */
export async function getSelections(): Promise<ResponseFormat> {
  const data = await College.findMany({
    select: {
      name: true,
      major: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  // Send response
  return {
    status: (data === null || Object.keys(data).length == 0) ? 500: 200,
    data: (data === null || Object.keys(data).length == 0) ? [] : data,
  };
}

/**
 * Returns the availability of an email address in the database.
 */
export async function getEmailAvailable(emailAddress: string): Promise<ResponseFormat> {
  const data = await Profile.findFirst({
    where: {
      email: emailAddress
    }
  });

  // Send response
  return {
    status: 200,
    data: (data === null || Object.keys(data).length == 0) ? { available: 'true' } : { available: 'false' },
  };
}

export async function createStudent(newStudent: any): Promise<ResponseFormat> {
  // Create a student to add enrollments to
  const student = await Student.create({
    data: {
      major: {
        connect: {
          id: Number.parseInt(newStudent.major_id)
        }
      },
      profile: {
        create: {
          name: newStudent.name,
          email: newStudent.email,
          credentials: {
            create: {
              password_hash: 'NOT_IMPLEMENTED',
              signup_date: DateTime.now().toJSDate(),
              last_login: DateTime.now().toJSDate()
            }
          }
        }
      }
    }
  })
  if (student == null) {
    logger.err('Error creating new student.')
    throw new Error('Error creating a new student.');
  }

  // Try to add sections after adding student
  for (let section in newStudent.sections) {
    var sec = await Enrollment.create({
      data: {
        section_id: Number.parseInt(newStudent.sections[section]),
        student_id: student.id
      }
    })
    if (sec == null) {
      logger.err(`Error assigning section ${newStudent.sections[section]} to student.`)
      throw new Error('Error assigning section to profile.');
    }
  }

  // Send response
  if (student === null || Object.keys(student).length == 0) {
    return {
      status: 403,
      data: { publicId: '' }
    };
  }
  return {
    status: 201,
    data: { publicId: student.profile_id },
  };
}

export async function rollbackStudent(publicId: any): Promise<ResponseFormat> {
  // Cascade delete
  let profileId = await Profile.delete({
    where: {
      id: publicId
    }
  })

  return {
    status: 200,
    data: { status: `successfully removed publicId: ${publicId}` },
  };
}
