/* eslint-disable import/prefer-default-export */
const alkash = require('./constants');

const login = (req) => {
  const {
    email,
    password,
  } = req.body;
  if (email === alkash.email && password === alkash.password) {
    return {
      status: 'success',
      profile: {},
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

module.exports = login;
