const {check,validationResult}=require('express-validator')
const User=require('../models/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


/**
 * @param {string} email  -email id of the user
 * @param {string} password -password
 */
const findByEmailAndPassword=(email,password)=>{
    return new Promise(async(resolve,reject)=>{

        const user=await User.aggregate([//finding user
            //stage 1
            {$match:{email:email}}
        ])
        
        if(!user.length){
            return reject('Email id not register!')
        }
        const ismatch=await bcryptjs.compare(password,user[0].password)//checking password is correct or not
        if(!ismatch){
            return reject('Incorrect password!')
        }

        resolve(user[0])
    })
}


/**
 * @param {objectId} id -user object id
 */
const generateToken=(id)=>{
    const token=jwt.sign({_id:id},'mysecret')//process.env.SECRET
    return token
}


/**
 * @param {object} req -data from the cleint
 * @param {object} res -to send the response
 */

exports.register=async(req,res)=>{
    try{
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).render('register',errors)
        }
        const user=new User(req.body)
        await user.save()
        req.flash('msg','Register sucessfully!')
        res.status(201).redirect('/signin')
    }catch(e){
        res.status(500).json(e)
    }
}


/**
 * @param {object} req -data from the cleint
 * @param {object} res -to send the response
 */

exports.signin=(req,res)=>{
    try{
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).render('signin',errors)
        }
        

        const email=req.body.email
        const password=req.body.password
        findByEmailAndPassword(email,password)
            .then((user)=>{
                res.cookie('auth_token',generateToken(user._id))
                req.flash('msg','Login successfully!')
                res.redirect('/main')
            })
            .catch((e)=>{
                req.flash('err',e)
                res.redirect('/signin')
            })
    }catch(e){
        res.status(500).json(e)
    }
}


/**
 * @param {object} req -node request
 * @param {object} res -node response 
 * @param {object} next -node next 
 */
exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies['auth_token']
        if(!token){
            return res.redirect('/signin')
        }
        const decode=jwt.verify(token,'mysecret')
        if(!decode){
            return res.redirect('/signin')
        }
        
        const user=await User.findById({_id:decode._id})
        if(!user){
            return res.redirect('/signin')
        }
        req.user=user
        next()
    }catch(e){
        res.status(500).json(e)
    }
}


exports.getProfile=async(req,res,next)=>{
    try{
        const profile=await User.aggregate([//finding user
            //stage 1
            {$match:{_id:req.user._id}},

            //stage 2
            {$project:{_id:0,name:1,email:1,phoneno:1,address:1}}
        ])
        req.profile=profile[0]
        next()
    }catch(e){
        res.status(500).json(e)
    }
}

exports.userLogout=(req,res,next)=>{
    try{
        res.cookie('auth_token','')
        next()
    }catch(e){
        res.status(500).json(e)
    }
}