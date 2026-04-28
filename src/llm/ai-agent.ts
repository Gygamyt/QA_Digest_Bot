import { ChatVertexAI } from "@langchain/google-vertexai";

export const llm = new ChatVertexAI({
    model: "gemini-2.5-flash",
    temperature: 1.5,
});
