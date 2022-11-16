const mongoose=require("mongoose");

//Database connection
const MONGODB_URL='mongodb+srv://admin:admin@icaf.b3fyk.mongodb.net/ICAF?retryWrites=true&w=majority';

const connectDB =async () =>{
    await mongoose.connect(MONGODB_URL,{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:false
    });
    console.log('Mongo Connection Succesfully Run !!');
}

module.exports=connectDB;

