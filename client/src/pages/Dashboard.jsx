import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import ReactPlayer from 'react-player'
import { Grid } from '@mui/material'
import axios from 'axios'

function Dashboard() {

const [videosurls, setVideoUrls]= useState()


const getAllvideos=async()=>{
    try{
        const videourls= await axios.get('http://localhost:5000/api/video/getAllvideos')
        setVideoUrls(videourls)
        console.log(videourls,"vvvvvvvvvvvvvvvvvvv")
    }
    catch(error){
        console.log(error)
    }
}


useEffect(()=>{
    getAllvideos()

},[])

  return (
    <>    
        <NavBar/>
        <Grid sx={{marginTop:"100px",marginLeft:"100px"}}>
            
            <ReactPlayer
                width="200px"
                height="200px"
                controls
                url="https://www.youtube.com/watch?v=7sDY4m8KNLc"
            />
        </Grid>
    </>

  )
}

export default Dashboard