require("dotenv").config(); // Because keeping secrets in plain sight is dumb
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); // Allowing everyone and their grandma to access your API
app.use(bodyParser.json()); // Because sending raw JSON is apparently too hard

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/extract-actions", async (req, res) => {
    try {
        const { text } = req.body;
        // Update model name as needed; verify available models with listModels()
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // AI, please translate human nonsense into something structured
        const prompt = `
You are an AI that extracts structured information. Given a conversation, return actionable items in this strict JSON format:
{
  "tasks": ["Task 1", "Task 2"],
  "events": [{ "title": "Event Name", "date": "YYYY-MM-DD", "time": "HH:MM AM/PM" }],
  "notes": "summarize the conversation"
}

Conversation:
"${text}"

Do not include any extra text—just return valid JSON.
`;

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        });
        console.log(result); // Log the entire result for debugging

        // Extract the response text; adjust if the structure changes
        const responseText = result.response.candidates[0].content.parts[0].text;
        console.log("Raw response:", responseText);

        // Remove Markdown formatting if present (e.g., "```json ... ```")
        const jsonStart = responseText.indexOf("{");
        const jsonEnd = responseText.lastIndexOf("}");
        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Could not locate JSON in the AI response.");
        }
        const cleanedResponse = responseText.slice(jsonStart, jsonEnd + 1);
        console.log("Cleaned JSON:", cleanedResponse);

        // Parse the cleaned JSON
        const extractedData = JSON.parse(cleanedResponse);
        res.json(extractedData);
    } catch (error) {
        console.error("AI had a mental breakdown:", error);
        res.status(500).json({ error: "Backend is cooked. Try again later." });
    }
});

// Spinning up the server because we like things that work (sometimes)
app.listen(5000, () => console.log("Server running on port 5000. Hopefully."));
