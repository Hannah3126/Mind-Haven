// test-openai.js (CommonJS)
require("dotenv").config();
const OpenAI = require("openai");

(async () => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY missing. Put it in .env or your shell.");
      process.exit(1);
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const out = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say 'hello' in 3 words." }],
    });

    console.log("✅ API call ok:", out.choices?.[0]?.message?.content);
  } catch (err) {
    console.error("❌ OpenAI test failed:", err.status || "", err.message);
    if (err.response?.data) console.error("Details:", err.response.data);
  }
})();
