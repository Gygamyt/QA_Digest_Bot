import { StateGraph } from "@langchain/langgraph";
import { GraphState } from "../types/state";
import { fetchNewsNode } from "./nodes/fetch";
import { generateDigestNode } from "./nodes/digest";
import { sendToGoogleChatNode } from "./nodes/chat";

export const workflow = new StateGraph(GraphState)
    .addNode("fetchNews", fetchNewsNode)
    .addNode("generateDigest", generateDigestNode)
    .addNode("sendToGoogleChat", sendToGoogleChatNode)
    .addEdge("__start__", "fetchNews")
    .addEdge("fetchNews", "generateDigest")
    .addEdge("generateDigest", "sendToGoogleChat")
    .addEdge("sendToGoogleChat", "__end__");
