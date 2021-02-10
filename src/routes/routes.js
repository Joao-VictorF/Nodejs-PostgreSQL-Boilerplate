// Receive all routes and export to app.js
const authRoutes = require('./modules/auth-route');
const userRoutes = require('./modules/user-route');

module.exports = [
  authRoutes,
  userRoutes,
];