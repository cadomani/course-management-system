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

// ORM convenience mapping
const User = prisma.profile;

/**
 * Retrieve the user profile
 */
export async function getUserProfile(identity: ProfileIdentity): Promise<ResponseFormat> {
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

