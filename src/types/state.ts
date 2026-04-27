import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({
    topic: Annotation<string>(),
    rawNews: Annotation<string>(),
    digest: Annotation<string>(),
    sources: Annotation<{ title: string; url: string }[]>(),

    webhookStatus: Annotation<number>(),
});
