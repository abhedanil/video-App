
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')

//generate token
const generateToken = (id) => {
    console.log(id,"66666666666")
    console.log(process.env.JWT_SECRET)
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}


//register user
const registerUser = asyncHandler(async(req,res)=>{
    console.log(req.body,"888888888888")
    const {name, email, password} = req.body
    console.log(name);
    if(!name || !email||!password){
        res.status(400)
        throw new Error("Please fill the fields")
    }
    //check if user exists
    const userExists = await UserModel.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exist')
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create User

    const user = await UserModel.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email:user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }

    res.json({ message: 'Register User '})
})

//Authenticate a user
// POST/api/users/login
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    
    //check for user email
    const user= await UserModel.findOne({email})
    console.log(user)
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            isHost:user.isHost,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

module.exports ={registerUser,loginUser}