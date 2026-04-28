import { ChatVertexAI } from "@langchain/google-vertexai";
import { ENV } from "../config";

export const llm = new ChatVertexAI({
    model: "gemini-2.5-flash",
    temperature: 1.5,
    apiKey: ENV.GOOGLE_API_KEY
});
