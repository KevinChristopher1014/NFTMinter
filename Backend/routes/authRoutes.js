const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/logout', authController.logout);


module.exports = router;