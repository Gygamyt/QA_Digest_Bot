import { TavilySearch } from "@langchain/tavily";
import { GraphState } from "../../types/state";

export async function fetchNewsNode(state: typeof GraphState.State) {
    console.log(`🔍 Ищем новости по теме: "${state.topic}" через Tavily...`);

    const searchTool = new TavilySearch({
        maxResults: 5,
        topic: "news",
        timeRange: "week",
    });

    const searchResult = await searchTool.invoke({ query: state.topic });

    const parsedResult = typeof searchResult === 'string'
        ? JSON.parse(searchResult)
        : searchResult;

    const resultsArray = Array.isArray(parsedResult)
        ? parsedResult
        : (parsedResult?.results || []);

    // Извлекаем ссылки уже из массива
    const sources = resultsArray.map((res: any) => ({
        title: res.title || "Читать источник",
        url: res.url
    })).filter((s: any) => s.url); // Убираем пустые

    // Отдаем модели только сами статьи, чтобы не тратить токены на мету
    const rawNews = JSON.stringify(resultsArray);

    console.log(`✅ Найдено ${sources.length} источников, передаем в Gemini...`);

    return { rawNews, sources };
}
