const mongoose =require('mongoose');
// schema is  a structure  of a dataa or blueprint of data how data look like 
const userSchema=new mongoose.Schema(
    {
       fname: String,
       lname: String,
    //    one user have only one email id not same unique will true
       email: {type:String, unique: true},
       
       password: String,
    },
    {
        collection: 'UserInfo',
    }
);
module.exports = mongoose.model('UserInfo',userSchema);