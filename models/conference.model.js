const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema({
    conferencetitle:{
            required:true,
            type:String,
            trim:true
    },
    description:{
            required:true,
            type:String,
            trim:true
        },
    venue:{
        required:true,
        type:String,
        trim:true
       },
    seats:{
        required:true,
        type:Number,
        trim:true
    },
    status:{
        required:true,
        type:String,
        trim:true
    },
    date:{
        required:true,
        type:String,
        trim:true
    }


    }
)
module.exports=mongoose.model('conference',conferenceSchema);