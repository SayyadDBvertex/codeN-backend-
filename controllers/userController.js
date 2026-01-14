import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import { sendFormEmail } from '../config/mail.js';

export const loginByGoogle = async (req, res, next) => {
    try {
        const { access_token } = req.body;

        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const profile = await googleRes.json();
        if (!profile) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        let user = await UserModel.findOne({ email: profile?.email });
        if (!user) {
            user = await UserModel.create({
                name: profile.name,
                email: profile.email,
                signUpBy: 'google',
            });
        }
        const token = await generateToken(user?._id);
        res.json({ token, user });
    } catch (err) {
        next(err)
    }
}



const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const register = async (req, res, next) => {
    try {
        const { name, email, mobile, address, countryId, cityId, collegeId, admissionYear, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            mobile, address, countryId, cityId, collegeId, admissionYear,
            signUpBy: 'email',
        });

        res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        next(error)
    }
};


export const verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isEmailVerified) {
            return res.status(401).json({ message: 'Email not verified' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = await generateToken(user?._id);
        res.json({
            message: 'Login successful',
            user, token
        });
    } catch (error) {
        next(error);
    }
};

export const resendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await sendFormEmail(email,otp);
        await user.save();

        // TODO: send OTP via email
        console.log('Resent OTP:', otp);

        res.json({ message: 'OTP resent successfully' });
    } catch (error) {
        next(error);
    }
};


