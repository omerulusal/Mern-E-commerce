const express = require('express')
const { register, login, logout, forgotPassword, resetPassword,userDetail } = require('../controllers/user.js');
const { authhenticationMid } = require('../middleware/auth.js');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/reset/:token', resetPassword);
router.get('/me', authhenticationMid, userDetail);
// userDetailde authhenticationMid gerekli. Giris yapmadan kendi hesabimi goremem
module.exports = router
