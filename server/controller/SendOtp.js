import OtpGenerator from '../utils/OtpGenerator.js';
import Transporter from "../utils/Transpoter.js"
import { user } from '../model/userSchema.js';

async function SendOtp(req, res) {

    // vefifyJwtToken middleware sendind the data req.user
    const { _id } = req.user || {};
    if (!_id) return res.status(401).json({ Message: "Invalid user data..!" })

    try {
        const userData = await user.findById(_id);
        if (userData) {

            // OTP GENERATOR FUNCTION
            const otpCode = OtpGenerator()

            // DRAFT EMAIL BODY
            const mailDraft = {
                from: process.env.SENDER_EMAIL,
                to: userData.email,
                subject: `Account Verification One Time Password For Imagify`,
                text: `Hello ${userData.userName} Your One Time Password is ${otpCode}, Do not share this code to anyone.`
            }

            // Send Mail by Transporter
            try {
                await Transporter.sendMail(mailDraft);

                // Save the OTP to the database after OTP send
                userData.otp = otpCode
                await userData.save();

                // Now return the response
                return res.status(200).send(`Hello ${userData.userName}, OTP Sent to your given email.`)

            } catch (error) {
                return res.status(500).send(`Error : ${error}`)
            }
        }
        else {
            return res.status(500).send(`User Not found`)
        }
    }
    catch (error) {
        return res.status(500).send(`Error while finding the user : ${error}`)
    }
}

export default SendOtp;