const Speaker =require('../models/speaker.model');

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

const addSpeakers = async (req, res) => {

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const Contact = req.body.Contact;
    const Role = req.body.Role;
    const Password = req.body.Password;
    const Identity = req.file.filename;
    const userType = Role;


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
}

const deleteSpeakers = async(req,res)=>{
    if(req.body){
        const speaker = new Speaker(req.body);
        try{
            const newSpeaker = await speaker.save();
            // res.status(201).json('Category added! ' + newCategory);
            res.status(201).json(newSpeaker);
        }catch(error){
            // res.status(400).json('Error: ' + error);
            res.status(400).json({message:error.message})
        }

    }
}

const updateSpeakers = async(req,res)=>{
    if(req.body){
        const speaker = new Speaker(req.body);
        try{
            const newSpeaker = await speaker.save();
            // res.status(201).json('Category added! ' + newCategory);
            res.status(201).json(newSpeaker);
        }catch(error){
            // res.status(400).json('Error: ' + error);
            res.status(400).json({message:error.message})
        }

    }
}
module.exports ={
    addSpeakers,
    deleteSpeakers,
    updateSpeakers,
}