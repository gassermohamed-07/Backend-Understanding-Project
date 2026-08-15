import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const signUp = async (req, res, next) =>{

  try {
    

    const {name, email, password} = req.body;
    const exists = await User.findOne({email});
    if(exists) {
      const error = new Error("User already exists!")
      error.statuscode = 409;
      throw error
    };

    const newUsers = await User.create({...req.body});
    const token = jwt.sign({id: newUsers._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    

    res.status(201).json({message: "User created successfully",
      data:{token, user: newUsers}});
    
  } catch (error) {
    next(error);
  }
} 
const signIn = async (req, res, next) =>{
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      const error = new Error("Invalid credentials!");
      error.statuscode = 401;
      throw error
    };
    const compare = await user.comparePassword(password);
    if(!compare) {
      const error = new Error("Invalid credentials!");
      error.statuscode = 401;
      throw error
    };

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.status(200).json({message: "User logged in successfully",
      data:{token, user}});
  } catch (error) {
    next(error);
  }
}

export {
  signUp,
  signIn,
  

}