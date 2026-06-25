const { GoogleGenAI } = require('@google/genai');

const suggestChatReply = async (req, res) => {
  try {
    const { role, lastMessage, context } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        suggestion:
          'Google Gemini API key is not added yet. Add GEMINI_API_KEY in backend .env to enable AI replies.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
Write one short, polite, professional chat reply for a campus placement portal.

Current user role: ${role || 'student'}
Conversation context: ${context || 'No extra context'}
Last received message: ${lastMessage || 'No message'}

Rules:
- Keep it under 60 words.
- Sound natural.
- Do not invent fake dates, offers, or promises.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      suggestion: response.text || 'Could not generate suggestion.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not generate AI suggestion',
      error: error.message,
    });
  }
};

module.exports = {
  suggestChatReply,
};