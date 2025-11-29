
export default function OtpGenerator() {
    
    const otpCode = Math.floor(100000 + (Math.random()*900000)) + ''
    return otpCode;
}