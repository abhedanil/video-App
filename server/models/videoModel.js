const mongoose= require('mongoose')

const videoSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    videos:[{
        type:String
    }],
    userId:{
        type:String,
        ref:'user'
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('video',videoSchema)
