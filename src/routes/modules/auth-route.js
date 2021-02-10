const express = require('express');
const router = express.Router();

const auth = require('@controllers/user/auth')

router.post('/auth/sign-up', auth.sign_up);

router.post('/auth/sign-in', auth.sign_in);

module.exports = router;
