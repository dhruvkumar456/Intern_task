const {check,validationResult}=require('express-validator')
const User=require('../models/user')

exports.register=[
    check('name')
        .exists()
        .withMessage('MISSING')
        .isLength({min:3})
        .withMessage('Enter the name of minimum 3 characters'),
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('Enter Valid Email id!!')
        .custom(async(email)=>{
            const user= await User.aggregate([
                //stage 1
                {$match:{email}}
            ])
            if(user.length){
                throw new Error('Email is already register!')
            }
        }),
    check('phoneno')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isMobilePhone()
        // .matches('/[\d]/{10}')
        .withMessage('Enter Valid Mobile Number!'),
    check('address')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({min:6})
        .withMessage('Password should be minimum 6 characters')
]


exports.signin=[
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('Email:IS_EMPTY')
        .isEmail()
        .withMessage('Enter Valid Email id!!'),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('Password:IS_EMPTY')
]