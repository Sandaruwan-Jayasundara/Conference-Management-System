const Schedule =require('../models/schedule.model');

const addSchedule = async(req,res)=>{
    if(req.body){
        const schedule = new Schedule(req.body);
        try{
            const newSchedule = await schedule.save();
            res.status(201).json(newSchedule);
        }catch(error){
            // res.status(400).json('Error: ' + error);
            res.status(400).json({message:error.message})
        }

    }
}

const getSchedule=async(req,res)=>{

    try{
        const schedules = await Schedule.find();
        res.status(200).json(schedules );
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// const deleteSchedule = async(req,res)=>{
//     if(req.body){
//         const category = new Category(req.body);
//         try{
//             const newCategory = await category.save();
//             // res.status(201).json('Category added! ' + newCategory);
//             res.status(201).json(newCategory);
//         }catch(error){
//             // res.status(400).json('Error: ' + error);
//             res.status(400).json({message:error.message})
//         }
//
//     }
// }

module.exports ={
    addSchedule,
    getSchedule,
    deleteSchedule,
}