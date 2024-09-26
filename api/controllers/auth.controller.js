import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/errorHandler.js';

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400,"all fields are required" ));
    }
    const hashPassword = bcrypt.hashSync(password,10);
    const newUser = new User({ 
        username, 
        email, 
        password:hashPassword } );
    try{
        await newUser.save();
        res.json({ message: "Signup suceessfull" });

    } catch(error){
        next(error);
    }
}

export const signin = async (req,res,next) =>{
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400,"all fields are required" ));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not Found"));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if(!validPassword){
            return next(errorHandler(400, "Invalid Password"));
        }

        const token = jwt.sign(
            { userID:validUser._id},
            process.env.JWT_SECRET,
        );

        const {password:pass,...rest} = validUser._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly : true
        }).json(rest); 

    } catch(error){
        next(error);
    }


}

export const googleAuth = async (req,res,next) =>{
    const { name, email, googlePhotoURL } = req.body;
    console.log(req.body);

    // if (!username || !email || !googlePhotoURL || username === '' || email === '' || googlePhotoURL === '') {
    //     next(errorHandler(400,"all fields are required" ));
    // }

    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign(
                { userID : user._id},
                process.env.JWT_SECRET,
            );
            const {password, ...rest} = user._doc;
            res.status(200)
                .cookie('access_token',token, { httpOnly:true})
                .json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username : name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-4),
                email,
                password: hashPassword,
                profilePicture:googlePhotoURL,
            });
            await newUser.save();
            const token = jwt.sign(
                { userID: newUser._id},
                process.env.JWT_SECRET,
            );
            const {password, ...rest} = newUser._doc;
            res.status(200)
                .cookie('access_token',token, { httpOnly:true})
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
}