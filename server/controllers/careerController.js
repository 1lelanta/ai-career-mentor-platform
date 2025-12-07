import {OpenAI} from 'openai';

const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export const getCareerRoadmap = async(req,res)=>{
    try {
        const {skills, experience} = req.body;

        const response = await client.chat.completions.create({
            model:"gpt-4o-mini",
            messages:[
                {role:"system", content: "You are a career roadmap AI."},
                {role: "user", content:`Skills: ${skills}\nExperience: ${experience}\nGive a roadmp.`}
            ]
        });

        res.json({roadmap:response.choices[0].message.content})
    } catch (err) {
        res.status(500).json({error:err.message});
        
    }
}