import express from 'express';
import CryptoJS from 'crypto-js';
import Passwords from '../models/password.js';
import authMiddleWare from '../middleware/auth.js'


const router = express.Router ();

router.post ('/add', authMiddleWare, async (req,res)=> {
    try {
        const {website,username,password} = req.body;
        const encryptedPass = CryptoJS.AES.encrypt (
            password,
            process.env.SECRET_KEY
        ).toString ()

        const savedPass =  await Passwords.create ({
            userId:req.user.id,
            website,
            username,
            password:encryptedPass
        })

        res.json ({message:"password saved",savedPass})
    } catch (err) {
        res.status(500).json({message:err})
        console.log(err)
    }
})

router.get ('/all',authMiddleWare,async (req,res)=> {
    const allPasswords = await Passwords.find ({userId : req.user.id});

    const decrypetd = allPasswords.map (p=> {
        const bytes = CryptoJS.AES.decrypt (p.password,process.env.SECRET_KEY);
        return {
            ...p._doc,
            password:bytes.toString (CryptoJS.enc.Utf8)
        }
    })

    res.json (decrypetd)
})


router.post ('/delete',authMiddleWare,async (req,res)=> {
    const {id} = req.body;
    try {
        await Passwords.deleteOne ({_id: id});
        res.json ({message:"deleted successfull"})
    } catch (err) {
        res.status (500).json ({message:err})
    }
})


export default router

