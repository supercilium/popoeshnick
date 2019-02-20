/* eslint-disable import/prefer-default-export */
const alkash = require('./constants');

const recovery = (req) => {
  const {
    email,
  } = req.body;
  if (email === alkash.validUser.email) {
    return {
      body: {
        status: 'success',
      },
    };
  }
  return {
    body: {
      errors: {
        recovery: ['Unknown email'],
        email: ['Invalid email address.'],
      },
      status: 'error',
    },
  };
};

module.exports = recovery;
