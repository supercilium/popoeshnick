const alkash = require('./constants');

const profile = (req) => {
  const userCookie = req.session;
  if (userCookie === alkash.validUser.session) {
    return {
      body: {
        status: 'success',
        profile: alkash.alkashProfile,
      },
    };
  }
  return {
    errors: {
      email: ['Invalid email address.'],
      password: ['Field must be at least 8 characters long.', 'Invalid input.'],
    },
    status: 'error',
  };
};

module.exports = profile;
