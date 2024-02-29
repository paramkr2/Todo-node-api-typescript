import UserModel from '../models/usermodel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs'

// Generate a new key pair
const publicKey = fs.readFileSync('src/keys/rsa.pub','utf-8');
const privateKey = fs.readFileSync('src/keys/rsa.ppk','utf-8');


export const SignUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success:false,error: 'Username is already taken' });
    }
	console.log('InSignup',password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ username, password: hashedPassword, email });

    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, privateKey, { algorithm: 'RS256' });

    res.status(201).json({ success: true, token: token });
  } catch (error) {
    console.log('Signup Error', error);
    res.status(500).json({ success: false, error: 'Signup failed' });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const areSame = await bcrypt.compare(password, user.password);

    if (!areSame) {
      return res.status(400).json({ success: false, error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, privateKey, { algorithm: 'RS256' });
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log('Login Error', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};
