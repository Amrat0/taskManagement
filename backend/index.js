const express= require('express')
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const app= express();
const cors=require('cors');
app.use(cors());

const PORT = process.env.PORT;
app.use(express.json())
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
const mongoUrl=process.env.mongoUrl;

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
 })
 .then(()=>{
    console.log('Connect to database')
 })
 .catch((e)=>console.log(e))

 app.get(["/data"],(req,res,next)=>{


  let Token = req.headers["authorization"]
  if(Token == null){
    res.send({
      status:false,
      message: "Not Authenticated!"
    }).status(401)
  }
    jwt.verify(Token,JWT_SECRET,(err,data)=>{
    console.log(err)
    console.log(data)
    if(err){
      res.send({
        status:false,
        message: "You are not allowed to change!"
      }).status(401)
    }
    else{
      req.MyId =  data.id
      next()
    }

  })

 })


// track data post on mongoose.
require("./models/userTracker")
   const User2=mongoose.model('Notes');
   app.post('/noteTracker', async(req,res)=>{

   try{
      const {title,description,iniStatus,date}=req.body;
       await User2.create({
         title,
         description,
         iniStatus,
         date,
       
       });
       res.send({status: "Ok"});

   }catch (error){
         res.send({status: "error occur"})
   }
   })

//  now send data on mongodb & register user
   require("./models/userDetails")
   const User=mongoose.model('UserInfo');
   app.post('/register', async(req,res)=>{
      const {fname,lname,email,password}=req.body;
          const encryptedPassword= await bcrypt.hash(password,10);
   try{
         const oldUser=await User.findOne({email});
         if(oldUser){
          return  res.json({error: "User Exists"})
         }
       await User.create({
         fname,
         lname,
         email,
         password: encryptedPassword,
       });
       res.send({status: "Ok"});

   }catch (error){
         res.send({status: "error occur"})
   }
   })

   // login user
   app.post('/login-user', async(req,res)=>{
      const {email,password}= req.body;
      const user=await User.findOne({email});
      if(!user){
       return  res.json({error: "User Not Found!"});
      }

      if(await bcrypt.compare(password,user.password)){
         const token=jwt.sign({email: user.email, id:user.id}, JWT_SECRET,{
            expiresIn: 86400,
         });
         if(res.status(201)){
            return res.json({status: "ok", data: token});
         }else{
            return res.json({error: "error"});
         }
      }
      res.json({status: "error",error: "Invalid Password"})
   })
// get data from tracker Notes and show in cards
const Notes = require('./models/userTracker');

app.get('/data', async (req, res) => {
  try {
    
    const data = await Notes.find().sort("-_id");
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// now delete data from id*************
// const Notes = require('./models/userTracker');
app.delete('/data/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const data = await Notes.findByIdAndDelete(id);
 
     if (data) {
       res.json({ message: 'Are You Sure' });
     } else {
       res.status(404).json({ error: 'Data not found' });
     }
   } catch (error) {
     console.error('Error deleting data:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });
  
  
//  now update the any data 
app.put('/data/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const updates = req.body;
 
     const data = await Notes.findByIdAndUpdate(id, updates, { new: true });
 
     if (data) {
       res.json(data);
     } else {
       res.status(404).json({ error: 'Data not found' });
     }
   } catch (error) {
     console.error('Error updating data:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });
 
   // getuser data for login and register user  
   app.post('/userData',async(req,res)=>{
      const {token}=req.body;
      try{
        const user=jwt.verify(token,JWT_SECRET ,(err,res)=>{

         if(err){
            return "Token expired";
          }
          return res;
         });
         console.log(user)
         if(user== "Token expired"){
            return res.send({status: "error", data: "Token expired"})
         }
        const useremail=user.email;
        User.findOne({email: useremail})
        .then((data)=>{
         res.send({status: "ok", data: data});
        })
        .catch((error)=>{
         res.send({status: "error", data: error})
        });
       
      }catch (error){

      }
   });



app.listen(PORT,()=>console.log(`Hey...Server Running on port: http://localhost${PORT}`));


