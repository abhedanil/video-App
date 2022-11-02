const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app= express()

const videoRoutes = require("./routes/video")

app.use(express.json())
app.use(express.urlencoded({extended:false})) 
app.use(cors())
const mongoUrl ="mongodb://localhost:27017/videoUploader"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
})

mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb...");
  });
  
  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to mongo", err);
  });
    

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})

app.use('/api/video',require('./routes/video'))
app.use('/api/user',require('./routes/userRoutes'))