import express from "express";
import user from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router ();

router.post ("/register", async (req,res)=> {
    const {username,email,password} = req.body;
    try {
        const existingUser = await user.findOne ({email});
        if (existingUser){
            return res.status(400).json ({message:"User already exists"});
        }
        const newUser = new user ({userName:username,email:email,password:password});
        await newUser.save ();
        res.status(201).json ({message:"user registered successfully"});
    } catch (error) {
        res.status (500).json ({message:"Something went wrong"});
    }
});


router.post ("/login",async (req,res)=> {
    const {email,password} = res.body;
    try {
        const existingUser = await user.findOne ({email});
        if (!existingUser) {
            return res.status (404).json ({message:"User not found"});
        }
        const isMatch = bcrypt.compare (password,existingUser.password);

        if (!isMatch) {
            return res.status (404).json({message:"invalid credentials"});
        }

        const token = jwt.sign ({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1j"});

        res.json ({token,existingUser});
    } catch (error) {
        res.status (500).json({message:"something went wrong"});
    }

})

export default router;