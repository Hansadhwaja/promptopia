
import Prompt from "@models/prompt";
import { connectTODB } from "@utils/database"
//GET

export const GET = async (request, { params }) => {
    try {
        await connectTODB();
        const prompts = await Prompt.findById(params.id).populate('creator').exec();

        if (!prompts) return new Response('Prompt not found', { status: 404 });

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error in fetching the posts", { status: 500 });
    }
}

//PATCH

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectTODB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response('Prompt not found', { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error in updating the prompt", { status: 500 });
    }
}

//DELETE

export const DELETE = async (request, { params }) => {
    try {
        await connectTODB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error in deleting the posts", { status: 500 });
    }
}
