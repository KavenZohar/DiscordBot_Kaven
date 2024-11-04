import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const nameReply = [
                    ', và **Kaven** là người đã kết nối tôi với con bot này',
                    ', và tôi được kết nối với api bởi **Kaven**',
                    ', tôi được lập trình bởi **Kaven** để có thể nhắn được trong discord này',
                    ' và được sửa lại bởi **Kaven**',
                    ' và Khôi 🐧'
                  ];

async function Gemini(content) {
    let i = Math.floor(Math.random() * nameReply.length);
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();
    return text.replace("Google", `Google${nameReply[i]}`);
  }

export default Gemini;