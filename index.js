import express from 'express';
import { config } from 'dotenv';
import OpenAI from "openai";

// Load environment variables
config();

// Create a web server
const app = express();
const port = process.env.PORT || 3034;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 🔐 from your .env
  });

// Define a route to handle questions
app.get('/ask-me', async (req, res) => {
  // Call the OpenAI API to generate an answer
  const question = req.query.question;

  const systemPrompt = `
  You are a Green Groove Technology AI assistant and you only answer questions that are related to smart manufacturing, industry 4.0, or factory automation.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ]
    });

    res.send(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error calling OpenAI API');
  }

});