import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER
export const register = async (req, res) => {
    try {
      const {
        username,
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        bio,
      } = req.body;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        bio,
        impressions: 0,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User doesn't exist." });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // remove password from userInfo
        const { password: userPassword, ...userInfo } = user._doc;
        res.status(200).json({ token, user: userInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}