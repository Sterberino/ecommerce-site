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
router.post('/register', Register);
router.post('/login', Login);
router.post('/tempUser', CreateTempUser);

module.exports = router;