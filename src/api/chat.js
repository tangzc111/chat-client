const AGENT_ENDPOINT =
  // "https://laotang-mastra-app.zichengtang349.workers.dev/api/scene-script";
  "http://localhost:4111/api/agents/sceneScriptAgent/generate";

const RUN_ID = "sceneScriptAgent";
const DEFAULT_RESOURCE_ID = "sceneScriptAgent";

let persistedThreadId = null;
let persistedResourceId = DEFAULT_RESOURCE_ID;

const createThreadId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `thread_${Date.now()}_${randomPart}`;
};

const toContentParts = (content) => {
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (part?.type === "text" && typeof part.text === "string") {
          const text = part.text.trim();
          return text ? { type: "text", text } : null;
        }
        if (typeof part === "string") {
          const text = part.trim();
          return text ? { type: "text", text } : null;
        }
        return null;
      })
      .filter(Boolean);
  }
  if (typeof content === "string") {
    const text = content.trim();
    return text ? [{ type: "text", text }] : [];
  }
  return [];
};

const mapHistory = (history = []) => {
  if (!Array.isArray(history)) return [];

  return history
    .map((item) => {
      if (!item) return null;
      const role =
        item.role && ["user", "assistant", "system"].includes(item.role)
          ? item.role
          : item.type === "assistant"
          ? "assistant"
          : "user";
      const parts = toContentParts(item.content);
      if (!parts.length) return null;
      return { role, content: parts };
    })
    .filter(Boolean);
};

const getLastFinishReason = (steps) => {
  if (!Array.isArray(steps)) return null;
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    const reason = steps[i]?.finishReason;
    if (reason) return reason;
  }
  return null;
};

const shouldMaintainContext = (output) => output?.resetContext !== true;

const normalizeUsage = (usage) => {
  if (!usage) return null;
  const promptTokens =
    usage.promptTokens ?? usage.inputTokens ?? usage.cachedInputTokens ?? null;
  const completionTokens =
    usage.completionTokens ??
    usage.outputTokens ??
    usage.reasoningTokens ??
    null;
  const totalTokens =
    usage.totalTokens ??
    (typeof promptTokens === "number" && typeof completionTokens === "number"
      ? promptTokens + completionTokens
      : typeof usage.inputTokens === "number" &&
        typeof usage.outputTokens === "number"
      ? usage.inputTokens + usage.outputTokens
      : undefined);
  return {
    promptTokens: promptTokens ?? undefined,
    completionTokens: completionTokens ?? undefined,
    totalTokens: totalTokens ?? undefined,
    raw: usage,
  };
};

async function callChatAgent(message, history) {
  const sanitizedHistory = mapHistory(history);
  const userParts = toContentParts(message);
  if (!userParts.length) {
    throw new Error("消息内容不能为空");
  }

  const messages = [
    ...sanitizedHistory,
    { role: "user", content: userParts },
  ];

  const threadId = persistedThreadId ?? createThreadId();
  if (!persistedThreadId) {
    persistedThreadId = threadId;
  }

  const resourceId = persistedResourceId ?? DEFAULT_RESOURCE_ID;

  const payload = {
    messages,
    runId: RUN_ID,
    modelSettings: {},
    runtimeContext: {},
    threadId,
    resourceId,
  };

  const res = await fetch(AGENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`请求失败(${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const output = data?.output ?? data;
  const steps = output?.steps ?? [];
  const finishReason = output?.finishReason ?? getLastFinishReason(steps);
  const usage = output?.usage ?? data?.usage ?? null;

  const keepContext = shouldMaintainContext(output);
  if (keepContext) {
    persistedThreadId = output?.threadId || persistedThreadId || threadId;
    persistedResourceId =
      output?.resourceId || persistedResourceId || DEFAULT_RESOURCE_ID;
  } else {
    persistedThreadId = null;
    persistedResourceId = DEFAULT_RESOURCE_ID;
  }

  const textOutput =
    typeof output === "string" ? output : output?.text ?? output?.content ?? "";

  return {
    text: textOutput,
    steps,
    finishReason,
    usage: normalizeUsage(usage),
    shouldMaintainContext: keepContext,
    threadId: persistedThreadId,
    model:
      output?.response?.modelId ||
      data?.response?.modelId ||
      "sceneScriptAgent",
    timestamp: output?.response?.timestamp || new Date().toISOString(),
    raw: output,
  };
}

export const chatAPI = {
  // 简单聊天
  async sendMessage(message, history = []) {
    try {
      const response = await callChatAgent(message, history);
      return {
        content: response.text,
        model: response.model,
        timestamp: response.timestamp,
        usage: response.usage,
        metadata: {
          steps: response.steps,
          finishReason: response.finishReason,
          shouldMaintainContext: response.shouldMaintainContext,
          threadId: response.threadId,
        },
      };
    } catch (error) {
      console.error("Chat Agent Error:", error);
      throw new Error(error.message || "发送消息失败");
    }
  },
};
