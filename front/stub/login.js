/* eslint-disable import/prefer-default-export */
const alkash = require('./constants');

const login = (req) => {
  const {
    email,
    password,
  } = req.body;
  if (email === alkash.validUser.email && password === alkash.validUser.password) {
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
  }
  return {
    body: {
      errors: {
        login: ['The email or password you entered is incorrect.', 'Please try again.'],
        email: ['Invalid email address.'],
        password: ['Field must be at least 8 characters long.', 'Invalid input.'],
      },
      status: 'error',
    },
  };
};

module.exports = login;
