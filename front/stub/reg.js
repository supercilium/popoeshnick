/* eslint-disable import/prefer-default-export */
const alkash = require('./constants');

const register = (req) => {
  const {
    email,
  } = req.body;
  if (email === alkash.validUser.email) {
    const res = {
      body: {
        errors: {
          registration: ['This email already registered in Popoeshnick club. Try to login or recovery password or register another email'],
          email: ['Invalid email address.'],
          password: ['Field must be at least 8 characters long.', 'Invalid input.'],
        },
        status: 'error',
      },
    };
    return res;
  }
  return {
    body: {
      status: 'success',
      profile: alkash.alkashProfile,
    },
    cookie: {
      key: 'session',
      value: alkash.validUser.session,
    },
  };
};

module.exports = register;
