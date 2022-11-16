const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
        regstartdate:{
            required:true,
            type:Date,
            trim:true
        },
        regenddate:{
            required:true,
            type:Date,
            trim:true
        },
        publishdate:{
            required:true,
            type:Number,
            trim:true
        },
        conferencedate:{
            required:true,
            type:Number,
            trim:true
        },
        conference:[{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            ref:'conference'
        }]
    }
)
module.exports=mongoose.model('schedule',scheduleSchema);