const  express=require("express");
var router = express.Router();
let path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserManagement=require("../../../models/UserManagementModel");
const userModel = require("../../../models/userModel");





router.route('/:id').get(async (req, res) => {
    
    const _id =  req.params.id;

   await UserManagement.findById(_id,(err, UserManagement)=>{
        return res.status(200).json({
            success:true,
            UserManagement
        });
     
    }).catch((err)=>{
        console.log(err);
    });

});



router.route('/delete/:id').delete((req, res) => {
    
    const _id = req.params.id;
     UserManagement.findByIdAndDelete(_id).then((sellers) => {

            res.json({
                status:"Success"
            })
    }).catch((err)=>{
        console.log(err);
    });

});






module.exports=router;