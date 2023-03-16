import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER
export const register = async (req, res) => {
    try {
        // GENERATE NEW PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // CREATE NEW USER
        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.file.filename,
        });

        // SAVE USER AND RETURN RESPONSE
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json("User not found");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(400).json("Invalid credentials");
        }
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5d" });
        delete user.password;
        res.status(200).json({ user, accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}