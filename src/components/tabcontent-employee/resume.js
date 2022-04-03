import {styled} from '@mui/material/styles';
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setResume, setUpdateResume, setUserData, setWarning } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../hooks/resume.hooks';

const Input = styled('input')({
    display: 'none',
  });

export const Resume = ({permission}) => {
    const {user, server} = useSelector(s => s.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {create} = useResume()

    const [pdf, ,setPdf] = useState(null)
    
    
    const updateResume = () => {
        dispatch(setUpdateResume(true))
        navigate('/update-resume')
    }
    
    const createResume = () => {
        dispatch(setResume(true))
        navigate('/create-resume')
    }

    const handleFile = async event => {
        const file = event.target.files[0]
        const formdata = new FormData()
        if(file.type.slice(12) !== 'pdf') 
            return dispatch(setWarning('nepeavilniy format'))
        formdata.append('file', file)
        await create(formdata, 'load')
    }

    if(user.resume) 
        return (
            <div className='p-2 px-4'>
                <div className='pt-3'>
                    <a href={`${server}static/resume/${user.resume}`} className='text-secondary' rel="noreferrer" target="_blank">Ssilka na vash resume</a>
                </div>
                <div className='pt-3'>
                <label htmlFor="contained-button-file-1">
                    <Input accept="pdf/*" onChange={handleFile}  id="contained-button-file-1" multiple type="file" />
                    <Button component="div" className='text-muted' style={{border:'1px solid #fff'}}>
                        Zagruzit drugoye
                    </Button>
                </label>
                </div>
                <div className='pt-3' onClick={updateResume}>
                    <Button component="span" className='text-muted' style={{border:'1px solid #fff'}}>
                        Sozdat drugoe
                    </Button>
                </div>
            </div>
        )

    return (
        <div className='resume-wrapper text-white'>
            <div className='text-center py-5'>
                <h2 className="px-5">Создайте свое резюме или загрузите существующее</h2>
                
            </div>
            <div className='text-center'>
                <div>
                    <Button onClick={createResume} className="text-white py-2 px-4" style={{border:'1px solid #fff'}}>Sozdat</Button>
                </div>
                <label htmlFor="contained-button-file">
                    <Input accept="pdf" onChange={handleFile} id="contained-button-file" multiple type="file" />
                    <Button component="span" className='py-2 px-4 my-3 text-white' style={{border:'1px solid #fff'}}>
                        Zagruzit
                    </Button>
                </label>
            </div>
        </div>
    )
}