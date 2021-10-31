import prisma from '@shared/Database';
import logger from '@shared/Logger';

// ORM convenience mapping
const User = prisma.profile;

/**
 * Interfaces
 */
interface QualifiedProfile {
  uuid: string | string[] | undefined;
  userId: string;
}

/**
* Replace public profile photo of a user
* @param options.uuid User UUID
* @param options.userId User ID
* @returns 
*/
export async function getUserProfilePhoto(options: Readonly<QualifiedProfile>) {
  // Check for presence of UUID header
  if (options.uuid == [] || options.uuid == undefined) {
    logger.err('This resource cannot be retrieved: X-USER-UUID header missing.');
    return {
      status: 400,
      data: "This resource cannot be retrieved: X-USER-UUID header missing."
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
* @param options.uuid User UUID
* @param options.userId User ID
* @returns
*/
export async function replaceUserProfilePhoto(options: Readonly<QualifiedProfile>) {
  // Check for presence of UUID header
  if (options.uuid == [] || options.uuid == undefined) {
    logger.err('This resource cannot be retrieved: X-USER-UUID header missing.');
    return {
      status: 400,
      data: "This resource cannot be retrieved: X-USER-UUID header missing."
    };
  }
  const data = {};
  const status = 200;

  return {
    status,
    data,
  };
}
