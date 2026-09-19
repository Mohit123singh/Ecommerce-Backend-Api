import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    email :{

        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }  
},{
  timestamps:true,
})


// Encrypt password using bcrypt
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        return;
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

})

// Sign JWT and return 
userSchema.methods.getSignedJwtToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
});
}

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model('User',userSchema)

export default User;