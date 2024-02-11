import Prompt from "@models/prompt";
import { connectTODB } from "@utils/database";


export const POST = async (req) => {

    const { creator, prompt, tag } = await req.json();
    try {
        await connectTODB();
        const newPrompt = new Prompt({
            creator,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (error) {
 return new Response("Failed to create a new prompt",{status:500});
    }
}