const { GoogleGenAI } = require('@google/genai');

const getGemini = () => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'paste_your_google_api_key_here') {
    return null;
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

const generateText = async (prompt) => {
  const ai = getGemini();

  if (!ai) {
    return 'Google Gemini API key is not configured. Add GEMINI_API_KEY in backend .env and restart backend.';
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text || 'AI could not generate a response.';
};

const suggestChatReply = async (req, res) => {
  try {
    const { role, lastMessage, context } = req.body;

    const prompt = `
Write one short professional reply for a campus placement portal chat.

Current user role: ${role || 'student'}
Context: ${context || 'No context'}
Last message: ${lastMessage || 'No message'}

Rules:
- Under 60 words.
- Helpful and natural.
- Do not invent dates, salary, interview results, or offers.
`;

    const suggestion = await generateText(prompt);
    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({
      message: 'Could not generate AI suggestion',
      error: error.message,
    });
  }
};

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, skills, company } = req.body;

    const prompt = `
Create interview preparation content for a college placement student.

Target role: ${role || 'Software Engineer'}
Company: ${company || 'campus recruiter'}
Skills: ${skills || 'React, Node.js, MongoDB'}

Return:
1. 5 technical questions
2. 3 HR questions
3. 2 project explanation questions
4. 3 quick preparation tips
`;

    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: 'Could not generate interview questions',
      error: error.message,
    });
  }
};

const generateResumeFeedback = async (req, res) => {
  try {
    const { skills, projects, cgpa, targetRole } = req.body;

    const prompt = `
Act as a campus placement resume reviewer.

CGPA: ${cgpa || 'Not provided'}
Skills: ${skills || 'Not provided'}
Projects: ${projects || 'Not provided'}
Target role: ${targetRole || 'Software Developer'}

Give:
1. Resume score out of 100
2. Strong points
3. Missing points
4. 5 exact improvements
5. A better resume summary in 3 lines
`;

    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: 'Could not generate resume feedback',
      error: error.message,
    });
  }
};

const generateCareerRoadmap = async (req, res) => {
  try {
    const { branch, skills, targetRole, months } = req.body;

    const prompt = `
Create a realistic placement preparation roadmap.

Branch: ${branch || 'CSE'}
Current skills: ${skills || 'HTML, CSS, JavaScript'}
Target role: ${targetRole || 'MERN Stack Developer'}
Timeline: ${months || '3'} months

Give:
1. Weekly roadmap
2. Skills to learn
3. Projects to build
4. Interview preparation plan
5. Job application strategy
`;

    const result = await generateText(prompt);
    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: 'Could not generate career roadmap',
      error: error.message,
    });
  }
};

module.exports = {
  suggestChatReply,
  generateInterviewQuestions,
  generateResumeFeedback,
  generateCareerRoadmap,
};