const mongoose=require('mongoose');
const schema=mongoose.schema;

const UserManagementSchema = new mongoose.Schema({

FirstName:{
    type:String,
    required: true
},
LastName:{
    type:String,
    required: true
},

Email:{
    type:String,
    required: true
},
Contact:{
    type:Number,
    required: true
},
Role:{
    type:String,
    required: true
},
passwordHash:{
    type:String,
    required: true
    },
Identity:{
    type:String,
     required: true
}

});

const UserManagement = mongoose.model("User Management",UserManagementSchema);
module.exports=UserManagement;