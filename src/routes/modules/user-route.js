const express = require('express');
const router = express.Router();

const user = require('@controllers/user/general')

/// List all users
router.get('/users', user.listAllUsers);

module.exports = router;
