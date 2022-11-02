import React, { useState } from "react";
import axios from "axios";
import { Avatar, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import { Box } from '@mui/system'
import { Navigate, useNavigate } from "react-router-dom";



function VideoUpload() {

    const paperStyle = { padding: '30px 20px', width: 500, margin: '70px auto', }
    const headerStyle = { margin: "10px 0", }
    const avatarStyle = { backgroundColor: '#1bbd72' }
    const [name, setName] = useState("");
    const [videos, setVideos] = useState([]);
    

    const navigate= useNavigate()

    const hadleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData();
        for (let key in videos) {
            formdata.append("videos", videos[key]);
        }

        formdata.append("name", name);

        axios
            .post(`http://localhost:5000/api/video/create`, formdata)
            .then((success) => {
                
                ;
                alert("Submitted successfully");
                console.log(success,"resssssssss")
                localStorage.setItem('url',JSON.stringify(response.data))
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                alert("Error happened!");
            });
    };



    return (

        <>



            <div className='outer'>
                <Grid >
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align="center">

                            <h2 style={headerStyle} >Upload Video</h2>
                        </Grid>
                        <form onSubmit={hadleSubmit}>
                            <TextField label='Name' type="text" name="name" onChange={(e) => setName(e.target.value)} fullWidth sx={{ margin: "5px 0" }} />

                            <TextField label='' type="file" name="videos" fullWidth sx={{ margin: "5px 0" }} onChange={(e) => { setVideos(e.target.files); }} />


                            <Box align="center" sx={{ margin: "10px 0" }}>
                                <Button type="submit" variant="contained" color="primary" align="center">upload</Button>
                            </Box>

                        </form>
                    </Paper>
                </Grid>
            </div>

        </>




 


    )
}

export default VideoUpload