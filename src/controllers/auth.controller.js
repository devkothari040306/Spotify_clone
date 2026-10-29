const jwt = require('jsonwebtoken');
const userModel= require('../models/user.model');
const bcrypt = require('bcryptjs');
async function registerUser (req, res) {
    const {username , email , password, role="user"} = req.body;
    const isUserAlreadyExists = await userModel.findOne( {
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists) {
        return res.status(409).json({
            message:"User already exists"
        })
    };
const hash = await bcrypt.hash(password , 10);  // pass and salt (delay)
    const user = await userModel.create({
        username , 
        email,
        password:hash,
        role
    });
    const token = jwt.sign({
        id:user._id,
        role:user.role
    } , process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message:"User registered successfully",
        user: {
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    });
}
async function loginUser(req,res) {
    const {username , email , password , role="user"}= req.body;
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });
    if(!user) {
      return   res.status(401).json({
            message:"Invalid credentials"
        })
    }
    const isPasswordValid =  await bcrypt.compare(password , user.password); // stored in database as hash
 if(!isPasswordValid) {
return res.status(401).json({
    message:"Invalid credentials"
});
 }
   const token = jwt.sign({
    id:user._id,
    role:user.role
   } , process.env.JWT_SECRET);
  res.cookie("token",token);
  res.status(200).json({
    message:"User logged in Successfully" ,
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    }
  })

}
async function logoutUser(req,res) {
    res.clearCookie("token");
    return res.status(200).json({
        message:"User logout successfully"
    })
}
module.exports={registerUser , loginUser , logoutUser};

