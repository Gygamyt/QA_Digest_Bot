import { ChatVertexAI } from "@langchain/google-vertexai";
import { ENV } from "../config";

let credentialsObj: any = undefined;
let projectId: string | undefined = undefined;

if (ENV.GOOGLE_CREDENTIALS_JSON) {
    credentialsObj = JSON.parse(ENV.GOOGLE_CREDENTIALS_JSON);
    projectId = credentialsObj.project_id;
}

if (credentialsObj) {
    console.log(`🔐 Инициализация Vertex AI: сервисный аккаунт. Проект: ${projectId}`);
    delete process.env.GOOGLE_API_KEY;
} else {
    console.log("🔐 Инициализация Vertex AI: локальная авторизация (ADC)");
}

// 3. Собираем агента
export const llm = new ChatVertexAI({
    model: "gemini-2.5-flash",
    temperature: 1.5,
    location: "us-central1",
    apiKey: undefined,
    ...(credentialsObj && {
        authOptions: { credentials: credentialsObj }
    }),
    ...(projectId && { project: projectId })
});
