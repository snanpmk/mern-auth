import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ message: "user saved successfully" })
    } catch (error) {
        next(error)
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'))

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Incorrect Password!'))
        
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: passwordRemoved, ...rest } = validUser._doc
        // destructured valid user object and placed password as passwordRemoved
        //  and all others into a variable rest
        const expiryDate = new Date(Date.now() + 3600000)
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(201)
            .json(rest);
    } catch (error) {
        next(error)
    }
}
