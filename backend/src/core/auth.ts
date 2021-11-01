import logger from '@shared/Logger';
import prisma from '@shared/Database';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

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
passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function (email, password, done)
{
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
  if (user === null) {
    return done('not found');
  }

  // Error pulling record TODO: Handle this as a prisma error
  if (typeof(user) !== 'object') {
    return done('failed');
  }

  // Validate password against salt
  logger.info(`login attempted with email: ${email} and password ${password}. Id retrieved is ${user.id}`)
  if (!validatePassword(user, password)) {
    return done(null, false, { message: 'The username or password was incorrect.' });
  }
  return done(null, user);
  }
));


/**
 * Compare plaintext password against bcrypt hash
 */
function validatePassword(user: any, plaintextPassword: string): boolean {
  // To be implemented
  // const hashedPassword = await Profile.findUnique({
  //   where: {
  //     id: user.i
  //   } 
  // })
  bcrypt.compare(plaintextPassword, user.credentials.password_hash, function (err, result) {
    return true;
  });

  // Fallthrough response
  return true;
}


export async function generatePasswordHash(plaintextPassword: string): Promise<string> {
  const hash = await bcrypt.hash(plaintextPassword, saltRounds);
  return hash;
}
