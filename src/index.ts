import 'dotenv/config';
import { workflow } from "./graph/workflow";

const app = workflow.compile();

async function main() {
    try {
        const result = await app.invoke({
            topic: "latest news Artificial Intelligence in QA testing",
            rawNews: "",
            digest: "",
        });

        console.log("\n================ 📰 ДАЙДЖЕСТ ================\n");
        console.log(result.digest);
        console.log("\n=============================================\n");
    } catch (error) {
        console.error("❌ Ошибка выполнения:", error);
    }
}

main();
