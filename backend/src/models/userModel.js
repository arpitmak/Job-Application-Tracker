const {Schema, model}= require('mongoose');
const userSchema=new Schema ({
    fullName:{type: String,required:true,trim: true},
    email:{type:String,required:true ,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ],
        trim: true,
        lowercase: true},
    password:{type:String,required:true,
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    }},{timestamps:true})
    module.exports=model("User",userSchema);