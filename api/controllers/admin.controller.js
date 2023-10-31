import User from "../models/user.model.js";


export const fetchAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        console.log(allUsers);
        return res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
}