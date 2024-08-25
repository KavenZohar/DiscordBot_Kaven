import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function gemini(content) {
  
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();
    return text;
  }