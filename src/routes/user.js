const express=require('express')
const route=express.Router()
const trimRequest=require('trim-request')
const validate=require('../controllers/validate')
const {check,validationResult}=require('express-validator')
const Usercontrollers=require('../controllers/user')

// @route   GET /register
// @desc    render register page
// @access  public
route.get('/register',(req,res)=> res.render('register'))

// @route   GET /signin
// @desc    render signin page
// @access  public
route.get('/signin',(req,res)=> res.render('signin'))


// @route   GET /main
// @desc    render main page after signin
// @access  private
route.get('/main',Usercontrollers.auth,(req,res)=> res.render('main'))



// @route   GET /profile
// @desc    render profile page
// @access  private
route.get(
    '/profile',
    Usercontrollers.auth,
    Usercontrollers.getProfile,
    (req,res)=> res.json(req.profile)
)

// @route   GET /logout
// @desc    logout user
// @access  private
route.get(
    '/logout',
    Usercontrollers.userLogout,
    (req,res)=> res.redirect('/')
)


// @route   POST /register
// @desc    creating new account
// @access  public
route.post(
    '/register',
    trimRequest.all,
    validate.register,
    Usercontrollers.register
)

// @route   POST /signin
// @desc    signin in the existing account
// @access  public
route.post(
    '/signin',
    trimRequest.all,
    validate.signin,
    Usercontrollers.signin
)

module.exports=route