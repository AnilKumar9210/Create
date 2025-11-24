import express from "express";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            username: username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("REGISTER ERROR:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token, user: existingUser });

    } catch (error) {
        console.error("LOGIN ERROR:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post ('/send-otp', async (req,res)=> {
    const {email} = req.body;

    try {
        const existingUser = await user.findOne ({email:email});
        if (!existingUser) return res.json ({message:"invalid email user not found"});

        const otp = Math.floor (100000 + Math.random()*900000);

        existingUser.otp = otp;
        existingUser.otpExpire = Date.now () + 5*60*1000;
        await existingUser.save();

        const transporter = nodemailer.createTransport ({
            service:"gmail",
            auth : {
                user: process.env.EMAIL,
                pass : process.env.EMAIL_PASSWORD
            },
            secure:true
        });

        await transporter.sendMail ({
            to:email,
            subject:"Password reset OTP from password manager",
            text:`your OTP for password reset is ${otp}. it is valid for 5 minutes`
        })

        res.json ({message:"otp sent to your email address",otp});
    } catch (error) {
        console.error ("SEND OTP ERROR:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.post ('/reset-password', async (req,res)=> {
    const {email, otp, newPassword} = req.body;

    try {
        const existingUser = await user.findOne ({email:email,
            otp:otp,
            otpExpire:{ $gt : Date.now ()}
        });
        if (!existingUser) return res.json ({message:"invalid OTP or OTP expired"});

        const salt = await bcrypt.genSalt (10);
        existingUser.password = await bcrypt.hash (newPassword,salt);

        existingUser.otp = null;
        existingUser.otpExpire = null;
        
        await existingUser.save ();
        res.json ({message:"password reset successfully"});
    } catch (err) {
        console.error ("RESET PASSWORD ERROR:", err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
})

export default router;
