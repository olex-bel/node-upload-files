const basicAuth = require('express-basic-auth');

const {user, password} = require('../config');

module.exports = basicAuth({
  users: {
    [user]: password,
  },
  challenge: true,
});
