const User = require('../models/user');

module.exports = {
  /**
  * DEBUG ROUTE
  * List all users in database.
  */
  listCourses: async (options) => {
    const data = await User.find();
    if (!data) {
      throw new Error('Data not found in database.');
    }
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  * Create a new course.
  */
  createCourse: async (options) => {
    const data = {
      status: '<string>',
      detail: '<string>',
    };
    const status = '201';

    return {
      status,
      data,
    };
  },

  /**
  * Replace an existing course.
  * @param options.id Course ID
  */
  replaceCourse: async (options) => {
    const data = {
      status: '<string>',
      detail: '<string>',
    };
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  * Update an existing course.
  * @param options.id Course ID
  */
  updateCourse: async (options) => {
    const data = {
      status: '<string>',
      detail: '<string>',
    };
    const status = '200';

    return {
      status,
      data,
    };
  },
};
