import { user } from "../model/userSchema.js";


async function verifyOtp(req, res) {

    const {otp} = req.body;
    if (!otp) return res.json(401).send({ message: "OTP not found" });

    // vefifyJwtToken middleware sendind the data req.user
    const { _id } = req.user || {};
    if (!_id) return res.status(401).json({ Message: "Invalid, login again" })

    try {
        const userData = await user.findById(_id);
        if (!userData) return res.status(401).json({ Message: "Invalid user data..!" })
        
        console.log(userData.otp , otp)
        if (userData.otp == otp) {

            // save the data to the database after isVerified = true, anmd otp = blank
            userData.isVerified = true;
            userData.otp = ""
            await userData.save()

            return res.status(201).json({ "message": "user Varified" })
        }
        else{
            return res.status(401).json({ "message": "Invalid Otp" })
        }

    } catch (error) {
        return res.status(500).send(`User not found: ${error}`)
    }
}


export default verifyOtp;