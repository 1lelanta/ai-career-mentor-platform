import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: "User already exist"});

        const hashed = await bcrypt.hash(password,10);
        user = await User.create({name,email,password:hashed});
        res.json({msg:"Registered successfully"});
    } catch (err) {
        res.status(500).json({error:err.message})    
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid credentials"});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({msg: "Invalid credentials"});

        const token = jwt.sign({user:{id:user._id}},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.json({token,user});
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}