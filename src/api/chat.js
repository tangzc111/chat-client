import { request, gql } from "graphql-request";

const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ||
  "https://chat-worker.zichengtang349.workers.dev/graphql";

const CHAT_QUERY = gql`
  query Chat($message: String!) {
    chat(message: $message) {
      content
      model
      timestamp
      usage {
        promptTokens
        completionTokens
        totalTokens
      }
    }
  }
`;

export const chatAPI = {
  // 简单聊天
  async sendMessage(message) {
    try {
      const data = await request(GRAPHQL_ENDPOINT, CHAT_QUERY, { message });
      return data.chat;
    } catch (error) {
      console.error("GraphQL Error:", error);
      throw new Error(error.response?.errors?.[0]?.message || "发送消息失败");
    }
  },
};
