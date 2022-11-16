const  express=require("express");
var router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserManagement=require("../../../models/UserManagementModel");
const userModel = require("../../../models/userModel");


//Save inserted photo in the folder
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //save location
        cb(null, '../Frontend/assets/UserManagement');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

//filter photo type
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


router.route('/').post(upload.single('Identity'),async (req, res) => {

   var FirstName =req.body.FirstName;
   var LastName =req.body.LastName;
   var Email =req.body.Email;
   var Contact = req.body.Contact;
   var Role =req.body.Role;
   var Password =req.body.Password;
   var Identity = req.file.filename;
    var userType = Role;
    


    console.log(
        req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.Contact,
        req.body.Role,
        req.body.Password,
        req.file.filename
    );


   if(!FirstName || !LastName ||!Email || !Contact ||!Password ||!Identity)
    return res
    .status(400)
    .json({errorMessage: "Please enter all required fields"});

    const salt = await bcrypt.genSalt();
    const passwordHash= await bcrypt.hash(Password, salt);

    const UserManage= new  UserManagement({
        FirstName,
        LastName,
        Email,
        Contact,
        Role,
        passwordHash,
        Identity
    });

    await UserManage.save().then(()=>{
        const newUser = new userModel({
            Email,userType, passwordHash
        });
            const saveUser =  newUser.save();
                const token=jwt.sign({
                    user:saveUser._id
                }, process.env.JWT_SECRET);
                
        res.cookie("token", token, {
            httpOnly: true
        });
        console.log("Working..........................");
          res.json({status:"Add a new user to the system"});

    }).catch((err) =>{
        
        console.log("User addning error");
        console.log(err);
    });
});

router.get('/display',async (req,res)=>{
    await UserManagement.find().then((UserManagement) => {
        if (UserManagement) {
            res.json(UserManagement); 
        } else {
            res.json({UserManagement:null}); 
       }

    }).catch((err)=>{
        console.log(err);
    });

});


router.route('/display/:id').get(async (req, res) => {
    
    const _id =  req.params.id;

   await UserManagement.findById(_id,(err, UserManagement)=>{
        console.log(UserManagement);
        return res.status(200).json({
            success:true,
            UserManagement
        });
     
    }).catch((err)=>{
        console.log(err);
    });

});



router.route('/updates/:id').put(async (req, res) => {
    
    const _id = req.params.id;

    var FirstName =req.body.FirstName;
    var LastName =req.body.LastName;
    var Email =req.body.Email;
    var Contact = req.body.Contact;
    var Role =req.body.Role;


    const data = {
        FirstName,
        LastName,
        Email,
        Contact,
        Role
    }


    const update  = UserManagement.findByIdAndUpdate(_id,data)
        .then(() => {
            console.log("Updated");
    res.status(200).send({status:"updated", user:update});
   }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Update Error"});
   });
});



module.exports=router;