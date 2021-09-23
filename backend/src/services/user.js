module.exports = {
  /**
  *

  */
  listUsers: async (options) => {
    const data = [{
      _id: '<string>',
      firstName: '<string>',
      lastName: '<string>',
      middleName: '<string>',
      nickname: '<string>',
      username: '<string>',
    }];
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  *

  */
  addUser: async (options) => {
    const data = {
      _id: '<string>',
      firstName: '<string>',
      lastName: '<string>',
      middleName: '<string>',
      nickname: '<string>',
      username: '<string>',
    };
    const status = '201';

    return {
      status,
      data,
    };
  },

  /**
  *
  * @param options.id User ID

  */
  replaceUser: async (options) => {
    const data = {
      detail: '<string>',
      status: '<string>',
    };
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  *
  * @param options.id User ID

  */
  updateUser: async (options) => {
    const data = {
      detail: '<string>',
      status: '<string>',
    };
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  *
  * @param options.xUSERUUID User UUID   * @param options.id User ID

  */
  getUserProfile: async (options) => {
    const data = {};
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  *
  * @param options.xUSERUUID User UUID   * @param options.id User ID

  */
  replaceUserProfile: async (options) => {
    const data = {
      detail: '<string>',
      status: '<string>',
    };
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  *
  * @param options.xUSERUUID User UUID   * @param options.id User ID

  */
  updateUserProfile: async (options) => {
    const data = {
      detail: '<string>',
      status: '<string>',
    };
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  *
  * @param options.id User ID

  */
  getUserUUID: async (options) => {
    const data = {};
    const status = '200';

    return {
      status,
      data,
    };
  },
};
