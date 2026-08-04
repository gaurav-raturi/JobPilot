 const { GoogleGenAI } = require('@google/genai');

 const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
 });

 console.log('Gemini API key:', process.env.GEMINI_API_KEY);

 const chatWithAI = async (req, res) => {

    try {
         
        const { message } = req.body;

        const prompt = `
        You are an AI Career Assistant for JobPilot.
        
        Your responsibilites are:
        
        - Help users with resume writing.
        - Help users prepare for interviews.
        - Answer React, JavaScript, Node.js, Express.js, MongoDB and MERN Stack questions.
        - Give career guidance and job search tips.
        - Keep responses clear, friendly, and professional.
        
        User Question:
        ${message}`;

        const response = await ai.models.generateContent({
            model : 'gemini-3.6-flash',
            contents : prompt

        });

        res.json({

            success : true,
            reply : response.text
        });
    } 

    catch(error) {
        console.error(error);

        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        });
    }
};

module.exports = { chatWithAI };