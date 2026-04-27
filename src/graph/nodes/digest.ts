import { GraphState } from "../../types/state";
import { llm } from "../../llm/ai-agent";

export async function generateDigestNode(state: typeof GraphState.State) {
    console.log("🧠 ИИ анализирует и пишет текст...");

    const prompt = `
  Ты — опытный IT-редактор. Твоя задача — написать короткий дайджест для разработчиков и QA-инженеров на основе сырых результатов поиска.
  
  Тема: ${state.topic}
  Сырые данные: ${state.rawNews}

  Правила:
  1. Выбери 2-3 самые важные новости.
  2. Напиши кратко, по делу.
  3. СТРОГИЕ ПРАВИЛА ФОРМАТИРОВАНИЯ (HTML):
     - Форматируй ответ ТОЛЬКО базовыми HTML-тегами.
     - Для жирного текста используй <b>текст</b>.
     - Для курсива используй <i>текст</i>.
     - Для переноса строки используй <br>.
     - Для списков не используй теги ul/li, просто ставь символ "•" в начале строки и <br> в конце.
     - Никакого Markdown (звездочек или решеток)!
  4. Добавь каплю профессионального юмора в конце.
  `;

    const response = await llm.invoke(prompt);
    return { digest: response.content as string };
}
