const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const session=require('express-session')
const flash=require('connect-flash')
const cookieParser=require('cookie-parser')

require('./middleware/db')//  connect to database

app.set('view engine','ejs')// set template

app.use(express.json());//to get data from unit test cases
app.use(bodyParser.urlencoded({ extended: true })); //get data in req.body


app.use(cookieParser())

app.use(session({ //to set session of flash messages
	secret:'secret123',
	resave:true,
	saveUninitialized:true
}))
app.use(flash())


app.use((req,res,next)=>{// creating the global variables
	res.locals.sweet_alert_error=req.flash('sweet_alert_error')
	res.locals.sweet_alert_success=req.flash('sweet_alert_sucess')
	res.locals.msg=req.flash('msg')
	res.locals.err=req.flash('err')
	next()
})




app.get('/',(req,res)=>{
    res.render('index')
})

app.use(require('./routes/user'))

module.exports=app 