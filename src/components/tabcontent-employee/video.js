import React from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useFile } from "../../hooks/file.hook";
import { setError, setUserData } from '../../redux/actions';
import { Player } from 'video-react';
import "/node_modules/video-react/dist/video-react.css";

const Input = styled('input')({display: 'none',});

export const OwnVideo = () => {
    const {user, server} = useSelector(s => s.app)
    const dispatch = useDispatch()

    const {uploadFile,deleteFile} = useFile()

    const videoHandler = async event => {
        const formdata = new FormData()
        const file = event.target.files[0]
        formdata.append('file', file)
        if(file.type.slice(0,5) !== 'video') 
            return dispatch(setError('Viberite pravilniy format'))
        await uploadFile(formdata, 'video')
    }

    if(!user.video) 
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <label htmlFor="contained-button-file">
                    <Input onChange={videoHandler} accept="video/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                        Zagruzit
                    </Button>
                </label>
            </div>
        )


    

    return (<div className="p-3 w-100 row mx-0">
        <div className="col">
            <Player
                playsInline
                src={`${server}static/video/${user.video}`}
            />
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
            <label htmlFor="contained-button-file2">
                <Input onChange={videoHandler} accept="video/*" id="contained-button-file2" multiple type="file" />
                <Button variant="contained" component="span" className="bg-warning text-dark">
                    Zamenit
                </Button>
            </label>
            <label className="py-2">
                <Button variant="contained" onClick={() => deleteFile('video')} component="span" className="bg-danger">
                    Udalit
                </Button>
            </label>
            
        </div>
        
    </div>)
}