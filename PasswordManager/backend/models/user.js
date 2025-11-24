import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    otp:{type:String},
    otpExpire : {type:Date}
})

const user = mongoose.model('user',userSchema);
export default user;