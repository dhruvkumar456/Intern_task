const mongoose=require('mongoose')
const bcryptjs=require('bcryptjs')

const Userschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phoneno:String,
        password:String,
        address:String
    },
    {
        timestamps:true,
    }
)


Userschema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
		user.password=await bcryptjs.hash(user.password,8)
	}
    next()
})


module.exports=mongoose.model('User',Userschema)