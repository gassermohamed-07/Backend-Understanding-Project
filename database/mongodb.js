import mongoose  from "mongoose";


 
const connectToDatabase = async() => {

  const DB_URI = process.env.MONGODB_URI;
  const NODE_ENV = process.env.NODE_ENV

  if(!DB_URI) {
  throw new Error("Please define the MONGODB_URI enviroment variable inside .env.<development/production>.local")
  }

  try{
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`);

  }
  catch(error){
    console.error(`Error connecting to database ${error}`);

    process.exit(1);

  }
}

export default connectToDatabase;