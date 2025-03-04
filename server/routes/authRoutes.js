const express = require('express');
const {  loginUser, checkAuth } = require('../controllers/authController');

const router = express.Router();


router.post('/login', loginUser);
router.get('/auth', checkAuth);

module.exports = router;
