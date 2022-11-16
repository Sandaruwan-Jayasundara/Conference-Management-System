/**
 * TO START SERVER
 * npm run nodemon
 *CHECKED/
/** Dependancies
 * npm i bcryptjs 
 * npm i jsonwebtoken
 * npm i cookie-parser
 */

 const express=require("express");
 const bodyParser=require("body-parser");
 const cors=require("cors");
 const dotenv=require("dotenv");
 const connectDB =require('./connection');
 const app=express();
 const cookieParser = require("cookie-parser");
 var multer = require('multer');
 dotenv.config();
 
 //server run in this port 8070
 const PORT = process.env.PORT || 8070;
 
 //Connect data base
 connectDB();
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors(
     { 
      origin:["http://localhost:3000"],
      credentials: true,
     }
 ));
 
 app.use(bodyParser.json());
 

const API=require('./API/api');
app.use("/api",API);


app.listen(PORT,() =>{
    console.log('Service is running');
});
