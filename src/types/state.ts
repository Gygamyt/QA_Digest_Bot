import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({
    topic: Annotation<string>(),
    queries: Annotation<{ category: string; query: string }[]>(),
    categorizedNews: Annotation<{ category: string; rawNews: string }[]>(),
    digest: Annotation<string>(),
    isDebug: Annotation<boolean>(),
    webhookStatus: Annotation<number>(),
});
