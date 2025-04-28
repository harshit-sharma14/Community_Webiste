const router = require('express').Router(); // Correctly instantiate the router
const { loginValidation, signupValidation } = require('../Middleware/AuthMiddleware');
const { login, signup } = require('../Controller/AuthController');


router.post('/login',loginValidation,login)
router.post('/signup', signupValidation, signup);

module.exports = router;