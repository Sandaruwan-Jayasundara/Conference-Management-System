const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
        name:{
            required:true,
            type:String,
            trim:true
        },
        description:{
            required:true,
            type:String,
            trim:true
        },
    img:{
        required:true,
        type:String,
        trim:true
    }
    ,
        conference:[{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            ref:'conference'
        }]
    }
)
module.exports=mongoose.model('speaker',speakerSchema);