const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const users = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
    _id: ObjectId('625add3d78fb449f9d9fe2ee'),
    name: 'tester',
    email: 'tester@test.com',
    password: bcrypt.hashSync('tester@test.com', 10),
  },
];

module.exports = users;
