import { TavilySearch } from "@langchain/tavily";
import { GraphState } from "../../types/state";
import { ENV } from "../../config";

export async function fetchNewsNode(state: typeof GraphState.State) {
    console.log(`🔍 Начинаем сбор данных (Всего категорий: ${state.queries.length})...`);

    const categorizedNews = [];

    for (const q of state.queries) {
        console.log(`   -> Ищем: ${q.category}...`);

        const isNews = q.category !== "💼 Job Market & Interviews";

        const tool = new TavilySearch({
            tavilyApiKey: ENV.TAVILY_API_KEY,
            maxResults: 5,
            timeRange: "week",
            topic: isNews ? "news" : "general",
            includeDomains: [
                "https://www.ministryoftesting.com/feed/",
                "https://testautomationu.applitools.com",
                "https://www.softwaretestinghelp.com/top-tutorials-and-tools/",
                "https://www.guru99.com/feed",
                "https://openai.com/news/",
                "https://research.google/blog/",
                "https://venturebeat.com/category/ai",
                "https://www.deeplearning.ai/the-batch/",
                "https://www.infoq.com/",
                "https://hnrss.github.io/#firehose-feeds",
                "https://github.com/trending",
                "https://www.reddit.com/r/QualityAssurance ",
                "https://www.reddit.com/r/cscareerquestions ",
                "https://www.reddit.com/r/ExperiencedDevs",
                "https://stackoverflow.blog/",
                "https://www.thoughtworks.com/radar",
            ],
        });

        try {
            const searchResult = await tool.invoke({ query: q.query });
            const parsedResult = typeof searchResult === 'string' ? JSON.parse(searchResult) : searchResult;
            const resultsArray = Array.isArray(parsedResult) ? parsedResult : (parsedResult?.results || []);

            categorizedNews.push({
                category: q.category,
                rawNews: JSON.stringify(resultsArray)
            });
        } catch (e) {
            console.error(`   ❌ Ошибка поиска для ${ q.category }:`, e);
        }
    }

    console.log("✅ Все данные собраны, передаем в Gemini...");
    return { categorizedNews };
}
