import 'dotenv/config';
import { workflow } from "./graph/workflow";

const SCHEDULE = {
    monday: [
        { category: "🌍 Global IT & Development", query: "Global IT development news and trends" }
    ],
    wednesday: [
        { category: "🐞 QA & Testing", query: "Software QA and testing news" },
        { category: "💼 Job Market & Interviews", query: "IT job market trends, tech interview expectations, hiring" }
    ],
    friday: [
        { category: "🧠 AI Innovations", query: "Artificial Intelligence latest news" }
    ]
};

const app = workflow.compile();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    try {
        const isDebug = process.env.DEBUG_MODE === "true";
        const dayOfWeek = new Date().getDay();

        let runs: { topic: string; queries: any[] }[] = [];

        if (isDebug) {
            console.log("🛠 ВНИМАНИЕ: Запущен DEBUG MODE.");
            console.log("Будут отправлены ТРИ отдельных сообщения за каждый день недели.\n");
            runs = [
                { topic: "Global IT & Development", queries: SCHEDULE.monday },
                { topic: "QA, Testing & Job Market", queries: SCHEDULE.wednesday },
                { topic: "AI Innovations", queries: SCHEDULE.friday }
            ];
        } else {
            if (dayOfWeek === 1) {
                runs.push({ topic: "Global IT & Development", queries: SCHEDULE.monday });
            } else if (dayOfWeek === 3) {
                runs.push({ topic: "QA, Testing & Job Market", queries: SCHEDULE.wednesday });
            } else if (dayOfWeek === 5) {
                runs.push({ topic: "AI Innovations", queries: SCHEDULE.friday });
            } else {
                console.log("😴 Сегодня не ПН, СР или ПТ. Бот отдыхает.");
                process.exit(0);
            }
        }

        for (const run of runs) {
            console.log(`\n======================================================`);
            console.log(`🚀 Запуск пайплайна: ${run.topic} (Категорий: ${run.queries.length})`);

            const result = await app.invoke({
                topic: run.topic,
                queries: run.queries,
                isDebug: isDebug,
                categorizedNews: [],
                digest: "",
            });

            console.log(`✅ Выполнение завершено! Статус вебхука: ${result.webhookStatus}`);

            if (runs.length > 1) {
                console.log("⏳ Пауза 5 секунд перед следующим сообщением...");
                await sleep(5000);
            }
        }

        console.log("\n🎉 Все задачи успешно выполнены!");

    } catch (error) {
        console.error("❌ Ошибка выполнения:", error);
    }
}

main();
