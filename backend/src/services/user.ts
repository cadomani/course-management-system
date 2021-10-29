import prisma from '@shared/Database';
import logger from '@shared/Logger';
import {
  ProfileIdentity,
  CreateProfile,
  UpdateProfile,
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
  // options: CreateProfile
  user: any
): Promise<ResponseFormat> {
  const data = await User.create({
    data: user
  })

  return {
    status: 201,
    data,
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
  } else {
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
  const data = {
    uuid: ''
  };
  const status = 200;

  return {
    status,
    data,
  };
}
