module.exports = {
  /**
  * Create a new course.
  */
  authenticate: async (options) => {
    const data = {
      username: options.username,
      password: options.password,
    };
    const status = '200';

    return {
      data,
      status,
    };
  },
};
