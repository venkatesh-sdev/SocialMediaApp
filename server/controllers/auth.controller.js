import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const Register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation,
        } = req.body;

        // Generating Salt 
        const salt = await bcrypt.genSalt();

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check User Is Already Exits
        const user = await User.findOne({ email });
        console.log(user)
        if (user) return res.status(400).json({ message: "The Email Already Exist" })

        // If User not Exits Creating User
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            location,
            occupation,
            viewedProfiles: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        // Delete Password data from NewUser for sending Response
        delete newUser.password;

        res.status(201).json(newUser);
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(501).json({ error: error })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking User Exists OR Not
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Does Not Exists" });

        // Checking Password Match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Check Your Details" });

        // Creating JWT TOKEN
        const token = jwt.sign({ id: user._id }, process.env.HASH_KEY);

        // Delete Password from User Object
        delete user.password;

        res.status(201).json({ token, user });
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(501).json(error)
    }
}