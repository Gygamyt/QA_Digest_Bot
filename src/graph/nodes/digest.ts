import { GraphState } from "../../types/state";
import { llm } from "../../llm/ai-agent";

export async function generateDigestNode(state: typeof GraphState.State) {
    console.log("🧠 ИИ обрабатывает категории...");

    let finalHtml = "";

    for (const item of state.categorizedNews) {
        console.log(`   -> Пишем раздел: ${item.category}...`);

        const prompt = `
    Ты — IT-редактор. Напиши ОДИН раздел для дайджеста на основе этих данных (JSON содержит url, title, content).
    
    Данные: ${item.rawNews}

    Правила:
    1. Выбери 3-4 самые важные новости из данных.
    2. СТРОГИЕ ПРАВИЛА ФОРМАТИРОВАНИЯ (HTML ДЛЯ GOOGLE CHAT):
       - БЕЗ ВСТУПЛЕНИЙ И ЗАКЛЮЧЕНИЙ! Только пункты списка.
       - Используй теги <b>, <i>, <a>, <br>.
       - Каждый пункт начинай с "• ".
       - Встраивай ссылки прямо в текст: • <b><a href="URL">Заголовок</a></b> — краткое описание.
       - В конце каждого пункта ровно один <br>.
    `;

        const response = await llm.invoke(prompt);
        let sectionText = response.content as string;

        sectionText = sectionText.replace(/```html/g, '').replace(/```/g, '').trim();

        finalHtml += `<font color="#1a73e8"><b>${item.category}</b></font><br>${sectionText}<br><br>`;
    }

    // const jokePrompt = `Напиши одну короткую шутку для QA инженеров или разработчиков. Без HTML, просто текст.`;
    // const jokeResponse = await llm.invoke(jokePrompt);
    //
    // finalHtml += `<i>${jokeResponse.content}</i>`;

    return { digest: finalHtml };
}
