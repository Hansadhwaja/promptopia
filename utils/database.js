import mongoose from 'mongoose'

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDb is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'promptDB',
        })

        isConnected=true;
        console.log('MongoDB is Connected');
    } catch (error) {
        
    }
}