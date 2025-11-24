import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema ({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    website:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
})

const password = mongoose.model('password',passwordSchema);

export default password;