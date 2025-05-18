const exporess = require('express')
const router = exporess.Router();
const authController = require('../controllers/auth')

const { body } = require('express-validator')
const validateUser = [
    body('name').not().isEmpty().withMessage('Name is Requird'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be atleast 8 character')
        .isStrongPassword().withMessage('Password must contain at least one uppercase, one lowercase, and one symbol'),
    body('phone').isMobilePhone().withMessage('Please enter a valid phonenumber')
]

router.post('/login', authController.login)
router.post('/register', validateUser, authController.register)
router.post('/forgot-password', authController.forgotPassword)
router.post('/verify-otp', authController.verifyPasswordResetOTP)
router.post('/reset-password', authController.resetPassword)
module.exports = router