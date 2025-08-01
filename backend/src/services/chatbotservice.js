// import Groq from "groq-sdk"; // Import the Groq SDK
// import dotenv from "dotenv"; 
// import fs from "fs";
// import path from "path";

// // Load environment variables
// dotenv.config();

// const GROQ_API_KEY = process.env.GROQ_API_KEY;
// const SYSTEM_PROMPT_PATH = path.join(__dirname, "system_prompt.txt");

// // Read system prompt from file
// let SYSTEM_PROMPT = "";
// try {
//     SYSTEM_PROMPT = fs.readFileSync(SYSTEM_PROMPT_PATH, "utf-8").trim();
// } catch (error) {
//     console.error("Error reading system prompt file:", error);
// }

// // Initialize the Groq client with the API key
// const groq = new Groq({ apiKey: GROQ_API_KEY });

// if (!GROQ_API_KEY) {
//     console.error("Error: GROQ_API_KEY is not defined in the environment variables.");
//     throw new Error("Missing GROQ_API_KEY");
// }

// // Send a message to Groq and get the bot's response
// const sendMessage = async (messageContent) => {
//     try {
//         console.log("Sending message to Groq:", messageContent);

//         // Call the Groq chat completions API
//         const chatCompletion = await groq.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: SYSTEM_PROMPT, // Add system prompt from file
//                 },
//                 {
//                     role: "user",
//                     content: messageContent, // Dynamically use the message content
//                 },
//             ],
//             model: "llama-3.3-70b-versatile", // Specify the model
//         });

//         // Extract the bot's response
//         const botResponse = chatCompletion.choices[0]?.message?.content || "No response received from the bot.";
//         return botResponse;
//     } catch (error) {
//         console.error("Error details:", error.response?.data || error.message);
//         throw new Error("Error sending message to Groq API");
//     }
// };

// export default sendMessage;


// GPT code

import Groq from "groq-sdk"; // Import the Groq SDK
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Fix `__dirname` for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error("Error: GROQ_API_KEY is not defined in environment variables.");
    throw new Error("Missing GROQ_API_KEY. Please check your .env file.");
}

// Define the path to the system prompt file
const SYSTEM_PROMPT_PATH = path.join(__dirname, "system_prompt.txt");

// Read system prompt from file safely
let SYSTEM_PROMPT = "";
if (fs.existsSync(SYSTEM_PROMPT_PATH)) {
    try {
        SYSTEM_PROMPT = fs.readFileSync(SYSTEM_PROMPT_PATH, "utf-8").trim();
        console.log("System prompt loaded successfully.");
    } catch (error) {
        console.error("Error reading system prompt file:", error.message);
    }
} else {
    console.warn(`Warning: System prompt file not found at ${SYSTEM_PROMPT_PATH}`);
}

// Initialize the Groq client with the API key
const groq = new Groq({ apiKey: GROQ_API_KEY });

// Function to send a message to Groq API
const sendMessage = async (messageContent) => {
    try {
        if (!messageContent) {
            throw new Error("Message content cannot be empty.");
        }

        console.log("Sending message to Groq:", messageContent);

        // Call the Groq chat completions API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: messageContent },
            ],
            model: "llama-3.3-70b-versatile",
        });

        // Extract the bot's response
        const botResponse = chatCompletion?.choices?.[0]?.message?.content || "No response received.";
        console.log("Bot Response:", botResponse);

        return botResponse;
    } catch (error) {
        console.error("Error sending message to Groq API:", error.response?.data || error.message);
        throw new Error("Error communicating with Groq API.");
    }
};

export default sendMessage;
