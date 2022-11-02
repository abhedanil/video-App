const videoModel = require('../models/videoModel')



const getAll = async(req,res)=>{
    try{
        const videos =await videoModel.find()
        res.status(200).json({
            videos,
            message:"videos fetch successfully"            
        })
    }
    catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

const create = async (req,res)=>{
    const {name} = req.body
    let videoPaths =[];

    if(Array.isArray(req.files.videos)&&req.files.videos.length>=0){
        for(let video of req.files.videos){
            videoPaths.push('/'+video.path)
        }
    }
    try{
        const createVideo= await videoModel.create({ 
            name,
            videos:videoPaths
        })
      
        res.json({
            message:"Video created succesfully",
            createVideo
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            error
        })
    }

}

module.exports ={create,getAll}