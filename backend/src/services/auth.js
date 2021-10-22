module.exports = {
  /**
  * Authenticate user based on credentials.
  */
  authenticate: async (options) => {
    const data = {
      email: options.email,
      password: options.password,
    };

    // For now, we're simply ignoring the password. If a user exists in the database,
    // they are returned regardless of the correctness of the password.
    const status = '200';

    return {
      data,
      status,
    };
  },
};
