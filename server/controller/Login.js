
import { user } from '../model/userSchema.js';

async function Login(req, res) {
    try {
        const { UserName, Password } = req.body || {};

        if (!UserName || !Password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // GETTING DATA FROM DB
        const userData = await user.findOne({ userName: UserName })

        if (!userData) {
            return res.status(400).json({ message: 'Username not available' });
        }

        // MATCHING THE PASSWORD WITH DB
        const isPasswordMatch = await userData.comparePassword(Password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Password Not Matched..!' });
        }

        // GENERATING JWT TOKEN DURING LOGIN FOR FURTHER PAGES
        const Token = await userData.jwtGenerator();

        res.cookie('Token', Token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        // CHANGING THE LOGIN DATA = TRUE IN userData object and then save this data to DB
        userData.isLoggedIn = true;
        await userData.save(); 

        // SENDING RESPONSE FROM SERVER
        return res.status(200).json({
            userData: userData,
            Token: Token,
            message: 'User Logged In.',
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export default Login;
