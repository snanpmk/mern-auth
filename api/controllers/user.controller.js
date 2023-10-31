import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
export const test = (req, res) => {
    res.json({
        message: 'hey the api is working'
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user._id !== req.param.id) {
        console.log(req.user._id+"😊😊😊");
        return errorHandler(401, 'You can update only your account !')
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        )
        console.log(updatedUser);
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user._id !== req.param.id) {
        return errorHandler(401, 'You can delte only your account !')
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        console.log(req.params.id+'🐐🐐');
        res.status(200).json('You account has been deleted')
    } catch (error) {
        next(error)
    }
}