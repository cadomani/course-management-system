import logger from '@shared/Logger';
import prisma from '@shared/Database';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { DateTime } from "luxon";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

// Constants
const saltRounds = 10;

// ORM convenience mapping
const Profile = prisma.profile;

// Serialize user
passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async function (id: number, done) {
  const user = await Profile.findFirst({
    where: {
      id: id
    },
    select: {
      credentials_id: false,
    }
  });
  done(null, user);
});

// Set up passport
passport.use(new passportLocal.Strategy({usernameField: 'email', passwordField: 'password'}, async function (email, password, done) {
  // Find user in database
  const user = await Profile.findFirst({
    where: {
      email: email
    },
    select: {
      id: true,
      name: true,
      email: true,
      credentials: true,
    }
  });
  
  // Account not found
  if (user === null || user.credentials === null) {
    return done('not found');
  }

  // Error pulling record TODO: Handle this as a prisma error
  if (typeof(user) !== 'object') {
    return done('failed');
  }

  // Validate password against salt
  bcrypt.compare(password, user.credentials.password_hash, async function (err, result) {
    if (result === true) {
      // Update last login time
      await Profile.update({
        where: {
          id: user.id
        },
        data: {
          credentials: {
            update: {
              last_login: DateTime.now().toJSDate()
            }
          }
        }
      })

      // Inject profile into request context
      return done(
        null, {
          id: user.id,
          name: user.name
        }
      );
    } else {
      return done(
        null,
        false, {
          message: 'The username or password was incorrect.'
        }
      );
    }
  });
}));

/**
 * Generate a hash from a plaintext password
 */
export async function generatePasswordHash(plaintextPassword: string): Promise<string> {
  const hash = bcrypt.hash(plaintextPassword, saltRounds);
  return hash;
}
