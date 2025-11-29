
# Imagify Backend (Express + MongoDB)

A lightweight Node.js/Express backend that supports user registration/login with JWT (via httpOnly cookies), email-based OTP verification using Nodemailer, and a simple text-generation endpoint powered by Google Generative AI. 

---

## 📦 Tech Stack
- **Node.js + Express** for HTTP APIs and routing. 
- **MongoDB + Mongoose** for persistence and models. 
- **JWT** for authentication (stored in `Token` cookie). 
- **Nodemailer** to send OTP emails. 
- **Google Generative AI** (Gemini) for `/generateText`. 
- **dotenv**, **cors**, **cookie-parser** for configuration and middleware. 

---

## 🗂️ Project Structure
```

.
├─ index.js                 # Express app bootstrap & server start
├─ db.js                    # MongoDB connection
├─ router.js                # Route definitions
├─ model/
│  └─ userSchema.js         # Mongoose User model & helpers
├─ controller/
│  ├─ RegisterPage.js       # Register & issue JWT cookie
│  ├─ Login.js              # Login & issue JWT cookie
│  ├─ SendOtp.js            # Send OTP email (protected)
│  ├─ verifyOtp.js          # Verify OTP (protected)
│  ├─ GenerateText.js       # Gemini text generation
│  └─ logout.js             # Clear cookie
├─ utils/
│  ├─ OtpGenerator.js       # 6-digit OTP generator
│  ├─ Transpoter.js         # Nodemailer transporter (SMTP)
│  └─ verifyJwtToken.js     # JWT middleware (from cookie)

    Cited from the provided source files. 

    ---

    ## ⚙️ Configuration
    Create a `.env` file in the project root with the following variables:

    ```env
    # Server
    PORT=3040               # Optional; defaults to 3040 if not set

    # MongoDB
    MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

    # JWT
    JWT_SECRET=replace_with_strong_secret

    # SMTP (Nodemailer)
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_USER=your_smtp_username
    SMTP_PASS=your_smtp_password
    SENDER_EMAIL=no-reply@example.com

    # Google Generative AI
    GENAIAPIKEY=your_gemini_api_key

*   `MONGO_URI` is consumed by the database connector. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   `PORT` falls back to `3040` when not provided. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)
*   `JWT_SECRET` is used to sign/verify tokens. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
*   SMTP variables configure the Nodemailer transporter. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   `SENDER_EMAIL` is used as the sender address when issuing OTP emails. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
*   `GENAIAPIKEY` is passed into the Google Gen AI client. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)

***

## 🚀 Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```
2.  **Add environment variables** (see above).
3.  **Run the server**
    ```bash
    node index.js
    # or
    nodemon index.js
    ```
    The server starts *after* a successful MongoDB connection and listens on `PORT || 3040`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js), [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)

***

## 🔐 Authentication Overview

*   On **register** and **login**, a JWT is issued and stored in an httpOnly cookie named `Token`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
*   Protected routes use the `verifyJwtToken` middleware, which reads the token from `req.cookies.Token` and attaches the decoded payload to `req.user`. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)

***

## ✉️ OTP Verification Flow

1.  **Register/Login** → receive `Token` cookie and user record saved/updated. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
2.  **Send OTP** (`POST /sendOtp`) → generates a 6-digit OTP, emails it via Nodemailer, and persists `user.otp`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js), [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
3.  **Verify OTP** (`POST /verifyOtp`) → compares the submitted code with `user.otp`; if matched, sets `isVerified = true` and clears `otp`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)

> Both `/sendOtp` and `/verifyOtp` are protected by JWT middleware. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)

***

## 👤 User Model (Mongoose)

Key fields: `userName`, `email`, `password`, `otp`, `isLoggedIn`, `isVerified`, `expireOtp`, `OtpAttempts`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)

Helpers:

*   `hashPassword(password)` → returns bcrypt hash with salt rounds = 10. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   `comparePassword(candidatePassword)` → compares plaintext with stored hash. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   `jwtGenerator()` → signs `{ _id }` with `JWT_SECRET`, expires in `24h`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)

***

## 🌐 API Reference

Base URL: `/api/v1` (see `index.js` + `router.js`). [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)

### Health

*   **GET /** → Basic test endpoint (implementation referenced as `TestApi`). [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)

### Auth & Users

*   **POST /registerPage** → Register a user. Body: `{ UserName, Email, Password }`. Sets `Token` cookie and returns `{ user, Token, message }`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)
*   **POST /login** → Login. Body: `{ UserName, Password }`. Sets `Token` cookie, marks `isLoggedIn = true`, and returns `{ userData, Token, message }`. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
*   **POST /logout** → Clears `Token` cookie and returns success text. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)

### OTP (Protected)

*   **POST /sendOtp** → Requires JWT cookie. Sends OTP email to the authenticated user’s email and stores it on the user record. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
*   **POST /verifyOtp** → Requires JWT cookie. Body: `{ otp }`. Verifies the code; sets `isVerified = true` and clears `otp` on success. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)

### AI

*   **POST /generateText** → Body: `{ question }`. Returns `{ Answer }` from Google Generative AI (Gemini). [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)

***

## 🧪 Sample Requests

```bash
# Register
curl -X POST http://localhost:3040/api/v1/registerPage \
  -H "Content-Type: application/json" \
  -d '{"UserName":"alice","Email":"alice@example.com","Password":"P@ssw0rd"}'

# Login
curl -X POST http://localhost:3040/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"UserName":"alice","Password":"P@ssw0rd"}'

# Send OTP (requires cookie from previous step)
curl -X POST http://localhost:3040/api/v1/sendOtp \
  -H "Content-Type: application/json" \
  --cookie "Token=<jwt>"

# Verify OTP
curl -X POST http://localhost:3040/api/v1/verifyOtp \
  -H "Content-Type: application/json" \
  --cookie "Token=<jwt>" \
  -d '{"otp":"123456"}'

# Generate Text
curl -X POST http://localhost:3040/api/v1/generateText \
  -H "Content-Type: application/json" \
  -d '{"question":"Explain JWT in one paragraph"}'
```

***

## 🔒 Security Notes

*   JWT is stored in an **httpOnly** cookie named `Token`. Consider adding `sameSite` and `secure: true` (in production) when setting cookies. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)
*   OTP routes are protected and rely on `req.cookies.Token` → ensure `cookie-parser` middleware is enabled. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)
*   Avoid returning sensitive fields (like `password`, `otp`) in API responses; sanitize user objects before sending. (Current code returns full user records in some endpoints.) [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js), [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md)

***

## ⚠️ Known Issues / To‑Dos

*   **Model export glitch**: `userSchema.js` contains a stray `mongoose.model.user` before exporting—clean up to `export const User = mongoose.model("User", userSchema);`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   **Schema options typos**: Use `required` (instead of `require`) and `unique: true` (rather than arrays) for `userName`, `email`, `password`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   **Types**: `OtpAttempts` should be a `Number`, not `String`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   **Server start**: `index.js` has a line break around `process.env.PORT || 3040`; simplify to `const PORT = process.env.PORT || 3040; app.listen(PORT, ...)`. [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)
*   **Filename typo**: `utils/Transpoter.js` should be `Transporter.js`; also consider conditional `secure` (true for 465). [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   **AI SDK usage**: `GenerateText.js` imports `{ GoogleGenAI }` and calls `ai.models.generateContent(...)`. Verify against the latest SDK interface and handle errors (`try/catch`). [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/RegisterPage.js)
*   **Cookie options**: Align `clearCookie` with the same options used in `res.cookie` to guarantee deletion across environments. [\[kr-prod.as...rosoft.com\]](https://kr-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d8-d88f756fa6f7a357f891ac01e71204bf/views/original/README.md), [\[cognizanto...epoint.com\]](https://cognizantonline-my.sharepoint.com/personal/2129662_cognizant_com/Documents/Microsoft%20Copilot%20Chat%20Files/SendOtp.js)
*   **Sanitize responses**: Avoid returning full `user` docs; omit `password`, `otp`, and internal fields.

***

## 📚 License

This codebase is provided as‑is by the project owner. Adjust licensing as appropriate.

## 👤 Maintainer

*   Tiwari, Rohan (Cognizant) (Author) — Office: Noida, UP.

```
