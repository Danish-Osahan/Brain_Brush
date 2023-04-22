import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration,OpenAIApi} from 'openai';

dotenv.config()

const router=express.Router();

const configuration=new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai=new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.status(200).json({ message: 'Hello from DALL-E!' });
})

// Route for creating image 

router.route('/').post(async (req, res)=>{
    const {prompt}=req.body;
   try {
    const response=await openai.createImage({
        prompt:prompt,
        n:1,
        size:"1024x1024",
        response_format:"b64_json"
    })

    const image = response.data.data[0].b64_json;
    res.status(200).json({photo:image})
   } catch (error) {
    console.log(error)

    res.status(500).send(error?.response.data.error.message)
   }
});



export default router;