module.exports = {
  /**
  * TODO: These routes belong inside user. Static should have Location header
  * redirection routes following after request to both these routes.
  * Retrieve public profile photo of a user from static (or DB) storage.
  * @param options.id User ID
  */
  getUserProfilePhoto: async (options) => {
    const data = {};
    const status = '200';

    return {
      status,
      data,
    };
  },

  /**
  * Replace public profile photo of a user by upload into static (or DB) storage.
  * @param options.xUSERUUID User UUID
  * @param options.id User ID

  */
  replaceUserProfilePhoto: async (options) => {
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
