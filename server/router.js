import express from "express";
const router = express.Router();

// Import all the routes
import TestApi from "./controller/TestApi.js";
import GenerateText from "./controller/GenerateText.js";
import RegisterPage from "./controller/registerPage.js";
import Login from "./controller/Login.js";
import SendOtp from "./controller/SendOtp.js";
import verifyJwtToken  from "./utils/verifyJwtToken.js";
import verifyOtp from "./controller/verifyOtp.js";



// controller for the routes
router.get("/", TestApi);
router.post("/generateText", GenerateText);

router.post('/registerPage', RegisterPage);
router.post("/login", Login);
router.post("/sendOtp", verifyJwtToken, SendOtp); // JWT Middleware 
router.post("/verifyOtp", verifyJwtToken, verifyOtp); // JWT Middleware 


export default router;

