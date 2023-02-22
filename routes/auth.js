/*
Auth routes
host + /api/auth
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

//Routes
router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),  
        validateFields,

    ],
    loginUser) 

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields,

    ],
     createUser );

router.get('/renew', validateJWT,  revalidateToken );


module.exports = router;