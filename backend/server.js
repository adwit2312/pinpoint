import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express"
import cors from "cors"
dotenv.config();
const app = express();
const openai = new OpenAI({
  apiKey:process.env.OPEN_AI_KEY
});

app.use(express.json());
const PORT = process.env.PORT || 9090;

const corsOptions = {
  origin: ["http://localhost:5174","http://localhost:5173"]
}

app.use(cors(corsOptions))

//!Global variable to hold the conversation history
let conversationHistory = [
  {role: "system", content: `You are a grocery‑pricing assistant.
When the user provides their location and desired ingredients or meals, respond with exactly five nearby grocery items offering the best prices.
If the user omits location, ingredients, or dietary preferences, ask for any missing information in **no more than two follow‑up questions**.
- If both location and ingredients are missing, combine them into a single follow‑up query.
- If only one is missing, ask for it individually.
Support optional dietary filters (e.g., organic, sugar‑free) and dietary goals or plans.
After two follow‑ups, proceed with available information.
Perform only this task and do not ask any further questions before presenting the results.
Answer quickly and with max 2 follow-up questions even when the user is being vague.


    
    
    `}
]

//! Routes
app.post("/ask", async (req,res) => {
  const userMessage = req.body.message;
  //!Update the conversation history with the user's message.
  conversationHistory.push({role: "user", content: userMessage});
  try{
     const completions = await openai.chat.completions.create({
        messages:conversationHistory,
        model:"gpt-4o"
      })
      const botResponse = completions.choices[0].message.content;
      res.json({message: botResponse});
  } catch(error){
    res.status(500).send("Error generating response from OpenAI")
  }
});

//! Run the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`))