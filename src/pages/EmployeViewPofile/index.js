import { Avatar, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PageLoader } from "../../components/pre-loader/PageLoader";
import { NavbarProfile } from "../../components/profile.navbar";
import { useResume } from "../../hooks/resume.hooks";
import { status } from "../resume";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Player } from 'video-react';
import "/node_modules/video-react/dist/video-react.css";


export const PublicViewEmployee = () => {
    const {server} = useSelector(s => s.app)
    const {getUser} = useResume()
    const params = useParams()
    const [user, setUser] = useState(null)
    useEffect(() => {
        (async function f() {
            const res = await getUser(params.id)
            setUser(res)
        })()
    }, [])


    return (
        <>
            <NavbarProfile />
            {!user?<PageLoader />:
                <div className='bg-light d-flex justify-content-center' style={{paddingTop:'76px', minHeight:'100vh'}}> 
                    <Paper elevation={5} className='my-5 bg-white w-75' style={{minHeight:'60vh'}}>
                        <div className='d-flex justify-content-between align-items-center py-3'>
                            <div className='d-flex'>
                                <div className='m-3 avatar-wrapper' style={{position:"relative", width:'56px',height:'56px'}}>
                                    <Avatar src={user.photo&&`${server}static/images/`+user.photo}  sx={{width:56,height:56, position:'absolute'}} className='bg-warning'>
                                        { user? user.name.slice(0,1).toLocaleUpperCase() :null}
                                    </Avatar>
                                </div>
                                    
                                <div className='d-flex flex-column justify-content-center'>
                                    <Typography variant="body2" className="px-1" color="text.secondary" > 
                                        {user.name}
                                    </Typography>
                                    
                                    <Typography variant="body2" className="pt-2" color="text.secondary" > 
                                        <LocationOnIcon /> {user.location}, status: {status[user.status]}
                                    </Typography>
                                </div>
                            </div>
                            <Button variant='filled' onClick={() => console.log(2)} className="bg-warning mx-4">
                                Get Contact
                            </Button>
                            
                        </div>
                        <Divider />
                        <div className='row m-0 p-0'>
                            <div className="col-9">
                                <div className='pt-3'>
                                    <a href={`${server}static/resume/${user.resume}`} className='text-secondary' rel="noreferrer" target="_blank">Ssilka na resume</a>
                                </div>
                                {
                                   !user.video?
                                   <div className='pt-3'>
                                        Video eshe ne zagrujeno  
                                    </div>:
                                     <div className="pt-4">
                                        <Player
                                            playsInline
                                            src={`${server}static/video/${user.video}`}
                                        />
                                    </div>
                                }
                                
                            </div>
                        </div>
                    </Paper>
                </div>
            }
            
        </>
    )
}