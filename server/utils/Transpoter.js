import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

const Transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host:process.env.SMTP_HOST,
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    },
    debug: true,
    logger: true,
    secure: false
});

export default Transporter;