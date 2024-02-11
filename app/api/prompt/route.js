import Prompt from "@models/prompt";
import { connectTODB } from "@utils/database"

export const GET = async (request)=>{
    try {
        await connectTODB();
        const prompts= await Prompt.find({}).populate('creator').maxTimeMS(20000);
        return new Response(JSON.stringify(prompts),{status:200});
    } catch (error) {
        console.log(error);
        return new Response("Error in fetching the posts",{status:500});
    }
}