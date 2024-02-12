import Prompt from "@models/prompt";
import {  connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}, (err, users) => {
            if (err) {
                console.error(err);
            } else {
                console.log(users);
            }
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 