module.exports = {
  /**
  * Create a new course.
  */
  authenticate: async (options) => {
    const data = {
      email: options.email,
      password: options.password,
    };
    const status = '200';

    return {
      data,
      status,
    };
  },
};
