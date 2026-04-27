import { buildDigestCard } from "../../templates/digestCard";
import { GraphState } from "../../types/state";

export async function sendToGoogleChatNode(state: typeof GraphState.State) {
    const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
    if (!webhookUrl) return { webhookStatus: 500 };

    console.log("🚀 Отправляем UI-карточку со ссылками в Google Space...");

    const body = buildDigestCard(state.topic, state.digest, state.sources);

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    return { webhookStatus: response.status };
}
