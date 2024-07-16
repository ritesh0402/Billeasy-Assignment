import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URI: string | undefined = process.env.MONGO_URI

// function to connect to mongodb
const connectToMongo = async () => {
   try {
      mongoose.connect(MONGO_URI as string);
      const db = mongoose.connection;

      db.on('error', () => console.log('Error Connecting to MongoDB!'))
      db.on('connected', () => {
         console.log('Connected to MongoDB!')
      })

   } catch (error) {
      console.log(error)
   }

}

export default connectToMongo