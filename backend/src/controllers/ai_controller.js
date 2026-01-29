const axios = require("axios");


const parseJob = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 40) {
      return res.status(400).json({ message: "Job description too short" });
    }

    const model =
      process.env.OPENROUTER_MODEL || "arcee-ai/trinity-large-preview:free";

    const system = `
You are an information extraction engine.
Return ONLY valid JSON. No markdown. No extra text.

Extract:
- company (string)
- role (string)
- summary (string, 1-2 lines with salary)

Rules:
- If unknown, use empty string.
- Keep summary short and factual.
`;

    const user = `
Job Description:
"""
${jobDescription}
"""
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages: [
          { role: "system", content: system.trim() },
          { role: "user", content: user.trim() }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("Invalid AI JSON");
      parsed = JSON.parse(raw.slice(start, end + 1));
    }

    return res.json({
      company: typeof parsed.company === "string" ? parsed.company.trim() : "",
      role: typeof parsed.role === "string" ? parsed.role.trim() : "",
      summary: typeof parsed.summary === "string" ? parsed.summary.trim() : ""
    });
  } catch (err) {
    console.error("AI parse error:", err?.response?.data || err.message);
    return res.status(500).json({ message: "AI parsing failed" });
  }
};

module.exports = { parseJob };
