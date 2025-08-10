import express from "express";
const router = express.Router();

// Import all the routes
import TestApi from "./controller/testApi.js";
import GenerateText from "./controller/generateText.js";


// controller for the routes
router.get("/", TestApi);
router.post("/generateText", GenerateText);



export default router;

