const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey =
  process.env.GOOGLE_API_KEY ||
  process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Gemini API key is missing in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const systemPrompt = `
You are an AI assistant for Basudeb Bej, a MERN stack developer.

Your job:
- Answer questions about Basudeb's portfolio
- Be short, clear, and professional
- If question is unrelated, gently redirect to portfolio topics

Portfolio Info:
- Skills: React, Node.js, Express, MongoDB
- Projects: Portfolio Website
- Role: Full Stack Developer

Tone:
- Friendly
- Concise
- Helpful
`;

const formatMessages = (messages) => {
  return messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
};

const buildSystemInstruction = (profileSummary) => {
  return [systemPrompt.trim(), profileSummary].filter(Boolean).join("\n\n");
};

const getMessages = (body) => {
  if (Array.isArray(body?.messages) && body.messages.length > 0) {
    return body.messages.filter(
      (m) => m && m.role && m.content
    );
  }

  const history = Array.isArray(body?.history)
    ? body.history.filter((m) => m && m.role && m.content)
    : [];

  if (body?.message) {
    return [...history, { role: "user", content: body.message }];
  }

  if (history.length > 0) {
    return history;
  }

  return [];
};

const fallbackReply = (msg = "") => {
  const text = msg.toLowerCase();

  if (text.includes("project")) {
    return "Basudeb has built a Portfolio Website using the MERN stack.";
  }

  if (text.includes("skill")) {
    return "Skills include React, Node.js, Express, and MongoDB.";
  }

  if (text.includes("contact")) {
    return "Use the Contact section in the portfolio to connect.";
  }

  return "I'm currently having trouble connecting to the AI service. Please try again later.";
};

const handleChat = async (req, res) => {
  try {
    const messages = getMessages(req.body);

    if (!messages.length) {
      return res.status(400).json({
        reply: "Please send a message.",
      });
    }

    const profile = req.body?.profile || {};
    const currentPath = req.body?.currentPath || "/";
    const profileSummary = [
      profile.name ? `Name: ${profile.name}` : null,
      profile.role ? `Role: ${profile.role}` : null,
      Array.isArray(profile.skills) && profile.skills.length
        ? `Skills: ${profile.skills.join(", ")}`
        : null,
      Array.isArray(profile.projects) && profile.projects.length
        ? `Projects: ${profile.projects.join(", ")}`
        : null,
      `Current page: ${currentPath}`,
    ]
      .filter(Boolean)
      .join("\n");

    const contents = formatMessages(messages);

    const result = await model.generateContent({
      contents,
      systemInstruction: buildSystemInstruction(profileSummary),
      generationConfig: {
        temperature: 0.7,
      },
    });

    const response = result.response;
    const reply = typeof response?.text === "function" ? response.text().trim() : "";

    if (!reply) {
      return res.json({
        reply: "No response generated. Try again.",
      });
    }

    return res.json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);

    if (
      error?.status === 401 ||
      error?.status === 403 ||
      error?.status === 429
    ) {
      return res.json({
        reply:
          "API key issue or quota exceeded. Please check billing or API access.",
      });
    }

    return res.status(500).json({
      reply: fallbackReply(
        req.body?.message ||
          req.body?.messages?.at?.(-1)?.content ||
          req.body?.history?.at?.(-1)?.content
      ),
    });
  }
};

module.exports = { handleChat };