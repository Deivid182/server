import mongoose from "mongoose"
import "dotenv/config";


export const connectDB = async () => {
  try {
    const connectionUri = process.env.MONGO_URI!
    const connection = await mongoose.connect(process.env.MONGO_URI!)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}