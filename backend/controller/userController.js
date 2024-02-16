// const userModel=require("../models/user")
// const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
// const SECRET_KEY="afldsjal@@#LEJ#@L";
// const signup=async(req,res)=>{
// //  check user exist already
// // hashcode password
// // user creation
// // token generate
// const {username,email,password}=req.body;
// // body main 3 properties ha
// try{
//     const existingUser=userModel.findOne({email:email});
//     if(existingUser){
//     return res.status(400).json({message: "User Already Exists"});
//     }
//     const hashPassword=await bcrypt.hash(password,10);
//     const result=await userModel.create({
//         email: email,
//         password: hashPassword,
//         username:username,
//     });
//     const token=jwt.sign({email:result.email, id: result._id},SECRET_KEY)
//     res.status(201).json({user: result, token:token});

// }catch(error){
//    console.log(error)
//    res.status(500).json({message:"Something went wrong"});
// }
// }
// const signin=async(req,res)=>{
//   const {email ,password}=req.body;
//   try{
//     const existingUser=userModel.findOne({email:email});
//     if(!existingUser){
//     return res.status(404).json({message: "User Not Found "});
//   } 
//   const matchPassword=bcrypt.compare(password, existingUser.password);
//   if(!matchPassword){
//     resstatus(400).json({message: "Invaild Data"})
//     }
//     const token=jwt.sign({email:existingUser.email, id: existingUser._id},SECRET_KEY)
//        res.status(201).json({user: existingUser,token:token})
//   }catch(error){
//     console.log(error)
//    res.status(500).json({message:"Something went wrong"});
//   }
// }

// module.exports={signup,signin}