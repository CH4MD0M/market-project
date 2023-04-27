const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
    name: 'tester',
    email: 'tester@test.com',
    password: bcrypt.hashSync('tester@test.com', 10),
  },
];

module.exports = users;
