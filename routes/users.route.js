const express = require("express");
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userRouter = express.Router();

userRouter.post("/signup" , (req,res) => {
    let {username , email , password} = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            try {
                if(err){
                    res.status(400).send({msg:"failed to add..."});
                }else{
                    let newUser = new UserModel({username , email , password : hash });
                    await newUser.save();
                    res.status(200).send({msg : "successfully added..."});
                }
            } catch (error) {
                res.status(400).send({msg:"failed to add..."});
            }
        });
    } catch (error) {
        res.status(400).send({msg:"failed to add..."});
    }
});

userRouter.post("/login" , async(req,res) => {
    console.log("in the user login");
    let {email,password} = req.body;
    let users=  await UserModel.find({email});
    let user;
    if(users.length > 0){
        user = users[0];
    }else{
        res.status(400).send({msg:"user not found..."});
    }
    try {
        bcrypt.compare(password, user.password, async (err, result) => {
            // result == true
            if(err){
                res.status(400).send({msg:"failed to login..."});
            }else{
                const token = jwt.sign({ email:email }, 'mock12');
                res.status(200).send({token});
            }
        });
    } catch (error) {
        res.status(200).send({msg:"failed to login"});
    }
});


module.exports = userRouter;

// {
//     "username" : "rajparmar",
//     "email" : "raj@gmail.com",
//     "password" : "rajparmar"
//   }