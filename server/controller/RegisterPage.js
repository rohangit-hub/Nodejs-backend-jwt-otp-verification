
import { user } from "../model/userSchema.js";

async function RegisterPage(req, res) {
  try {
    const { UserName, Email, Password } = req.body;

    // USER INPUT CHECKS 
    if (!UserName || !Email || !Password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // HASING THE PSSWORD
    const hashedPassword = await user.hashPassword(Password)

    // CREATE THE PAYLOAD IWTH HASHED PASSWORD
    const payload = {
      userName: UserName,
      email: Email,
      password: hashedPassword,
    };

    // CREATE THE INSTENCE WITH THE MODEL
    const newUser = new user(payload);

    // GENERATE THE JWT IWTH INSTANCE BEFORE SAVE THE DATA IN DB
    const Token = await newUser.jwtGenerator()

    // SAVE THE TOKEN INTO THE COOKIES FOR FURTHER LOGIN USE
    res.cookie('Token', Token, {
      httpOnly: true,
      secure: false,        // true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });


    // SAVE THE DATA INTO THE DB
    await newUser.save()
      .then(() => {
        return res.status(201).json({
          user: newUser,
          message: 'Registratoin Successfully',
          Token: Token,
        });
      })
      .catch(() => {
        return res.status(500).json({ message: 'Registration failed', error: error.message });
      })

  }
  catch (error) {
    console.error('not registered ', error);
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}

export default RegisterPage;


/*

{ 
    "UserName": "rohan1",
    "Email": "rohan71189131@gmail.com",
    "Password": "1234678"
}

*/