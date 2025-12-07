import {OpenAI} from 'openai';

const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export const analyzeResume = async(req,res)=>{
    try {
        const path = req.file.path;

        const response = await client.chat.completions.create({
            model: "gpt-4-mini",
            messages: [
                {role:"system", content:"You are a resume analysis AI."},
                {role: "user", content:`Analyze this resume file path: ${path}`}
            ]
        });

        res.json({analysis:response.choices[0].message.content});
        
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}