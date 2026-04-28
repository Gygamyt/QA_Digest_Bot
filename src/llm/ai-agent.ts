import { ChatVertexAI } from "@langchain/google-vertexai";
import { ENV } from "../config";

const authOptions = ENV.GOOGLE_CREDENTIALS_JSON
    ? { credentials: JSON.parse(ENV.GOOGLE_CREDENTIALS_JSON) }
    : undefined;

if (authOptions) {
    console.log("🔐 Инициализация Vertex AI: используется сервисный аккаунт (CI/CD)");
    delete process.env.GOOGLE_API_KEY;
} else {
    console.log("🔐 Инициализация Vertex AI: используется локальная авторизация (ADC)");
}

export const llm = new ChatVertexAI({
    model: "gemini-2.5-flash",
    temperature: 1.5,
    apiKey: undefined,
    ...(authOptions && { authOptions })
});
