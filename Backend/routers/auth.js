const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authenticationMiddleware')

const {
    Login,
    Register,
    CreateTempUser,
    GetCurrentUser
} = require('../controllers/auth.js');

router.get('/getcurrentuser', authenticationMiddleware, GetCurrentUser);
router.post('/register', authenticationMiddleware, Register);
router.post('/login', authenticationMiddleware,Login);
router.post('/tempUser', CreateTempUser);

module.exports = router;