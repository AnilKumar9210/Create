import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema ({
    website:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
})

const password = mongoose.model('password',passwordSchema);

export default password;