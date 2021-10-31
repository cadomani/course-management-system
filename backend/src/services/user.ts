import { Prisma } from '@prisma/client';
import prisma from '@shared/Database';
import logger from '@shared/Logger';
import {
  ProfileIdentity,
  CreateProfile,
  UpdateProfile,
  CreateStudentProfile,
  CreateInstructorProfile,
  QualifiedProfile,
  NonQualifiedProfile,
  ResponseFormat
} from '../schemas/user';

// ORM convenience mapping
const User = prisma.profile;


/**
 * DEBUG: List all users on the database
 * Access: Restricted
 * @param options 
 * @returns 
 */
export async function listUsers(): Promise<ResponseFormat> {
  const data = await User.findMany({
    select: {
      name: true,
      email: true,
      biography: true,
      university: true,
      credentials: {
        select: {
          last_login: true,
          signup_date: true,
        }
      }
    },
  });

  // Send success in either case
  return {
    status: 200,
    data: (data === null || Object.keys(data).length == 0) ? [] : data,
  };
}

/**
 * Add a user to the database
 * Access: Restricted
 * @param options 
 * @returns 
 */
export async function createUser(
  options: CreateProfile
): Promise<ResponseFormat> {
  // Create the base profile from options
  let profile: Prisma.profileCreateInput = {
    name: options.name,
    email: options.email,
    biography: options.biography,
    university: options.university,
    credentials: {
      create: {
        password_hash: options.password,
        signup_date: '1970-01-01T00:00:00.000Z',
      }
    },
  };

  if (options as CreateStudentProfile) {
    profile.student = {
      create: {
        major: {
          connect: {
            id: 1,
          }
        }
      }
    }
  } else if (options as CreateInstructorProfile) {
    profile.instructor = {
      create: {
        department: {
          connect: {
            id: 1
          }
        }
      }
    }
  }

  const data = await User.create({
    data: profile
  })

  return {
    status: 201,
    data: {
      publicId: data.id,
    },
  };
}

/**
 * Replace user in database
 * Access: Restricted
 * @param options 
 * @returns 
 */
export async function replaceUser(
  profile: NonQualifiedProfile,
  options: CreateProfile,
): Promise<ResponseFormat> {
  // Create the base profile from options
  let newProfile: Prisma.profileUpdateInput = {
    name: options.name,
    email: options.email,
    biography: options.biography,
    university: options.university,
    credentials: {
      update: {
        password_hash: options.password,
        signup_date: '1970-01-01T00:00:00.000Z',
      }
    }
  };

  // if (options as CreateStudentProfile) {
  //   newProfile.student = {
  //     update: {
  //       where: {
  //         id: 4,
  //       }
  //     }
  //   }
  // } else if (options as CreateInstructorProfile) {
  //   newProfile.instructor = {
  //     update: {
  //       department: {
  //         connect: {
  //           id: 1
  //         }
  //       }
  //     }
  //   }
  // }

  const data = await User.update({
    where: {
      id: Number.parseInt(profile.publicId)
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
 * Update a user already in the database
 * Access: Restricted
 * @param options 
 * @returns 
 */
export async function updateUser(
  profile: NonQualifiedProfile,
  options: UpdateProfile
): Promise<ResponseFormat> {
  const data = {
    detail: 'success',
    status: 'operation was successful',
  };
  const status = 200;

  return {
    status,
    data,
  };
}

/**
 * Retrieve the user profile
 * @param options 
 * @returns 
 */
export async function getUserProfile(
  identity: ProfileIdentity,
): Promise<ResponseFormat> {
  // Obtain data for profiles
  // TODO: Unstable behavior - type predicates don't seem to work when interfaces contain the same properties
  let data;
  if (identity as QualifiedProfile) {
    data = await User.findFirst({
      where: {
        id: Number.parseInt(identity.publicId),
      },
      select: {
        name: true,
        email: true,
        biography: true,
        university: true,
      }
    });
  } else if (identity as NonQualifiedProfile) {
    data = await User.findFirst({
      where: {
        id: Number.parseInt(identity.publicId),
      },
      select: {
        name: true,
        biography: true,
        university: true,
      }
    });
  } else {
    data = [];
  }

  // Send success in either case
  return {
    status: 200,
    data: (data === null || Object.keys(data).length == 0) ? {} : data,
  };
}

/**
 * Update the user profile
 * @param options 
 * @returns 
 */
export async function updateUserProfile(
  identity: QualifiedProfile,
  options: UpdateProfile
): Promise<ResponseFormat> {
  const data = {
    detail: 'success',
    status: 'operation was successful',
  };
  const status = 200;

  return {
    status,
    data,
  };
}

/**
 * Retrieve the private uuid of a user for authenticated requests
 * Tolerant against requests for already qualified profiles
 * @returns 
 */
export async function getUserUUID(
  identity: ProfileIdentity
): Promise<ResponseFormat> {
  const data = await User.findFirst({
    where: {
      id: Number.parseInt(identity.publicId)
    },
    // select: {
    //   //uuid: true
    // }
  })
  if (data === null) {
    return {
      status: 404,
      data: {},
    };
  }

  return {
    status: 200,
    data: {
      publicId: identity.publicId,
      uuid: 'NOT_IMPLEMENTED' // TODO: uuid column needs to be added to table - data.uuid
    },
  };
}
