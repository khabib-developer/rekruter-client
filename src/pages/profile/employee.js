import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, FormControl, Input, List, ListItemButton, NativeSelect, Paper, TextField, Tooltip, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideocamIcon from '@mui/icons-material/Videocam';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { NavbarProfile } from '../../components/profile.navbar'
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess, setTab, setUserData, setWarning } from '../../redux/actions';
import { regions } from '../../components/tabcontent/create-vacancy';
import { useAuth } from '../../hooks/auth.hook';
import { Resume } from '../../components/tabcontent-employee/resume';
import { History } from '../../components/tabcontent-employee/History';
import { OwnVideo } from '../../components/tabcontent-employee/video';
import { useFile } from '../../hooks/file.hook';
import { styled } from '@mui/system';
import { useProposal } from '../../hooks/proposal.hook';
import { useNavigate } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const Employee = () => {
    const navigate = useNavigate()
    const {update} = useAuth()
    const {getBid} = useProposal()
    const dispatch = useDispatch()
    const {uploadFile, deleteFile} = useFile()
    const {user, server} = useSelector(s => s.app)
    const {tab} = useSelector(s => s.ui)
    const [busyness, setbusyness] = useState(user.status??0)
    const [location, setLocation] = useState(user.location||regions[0].label)

    const [name, setName] = useState(user.name)
    const [okBtn, setOkBtn] = useState({})

    const Input2 = styled('input')({
        display: 'none',
      });

    useEffect(() => {
        getBid()
    } ,[])

    const handleName = () => {
        if(name !== '') {
            return update({name})
        }
        setName(user.name)
        dispatch(setWarning("Imya ne mojet bit pustim"))
    }

    const handleFile = async event => {
        const formdata = new FormData()
        const file = event.target.files[0]
        formdata.append('file', file)
        if(file.type.slice(0,5) !== 'image') 
            return dispatch(setError('Viberite pravilniy format'))
        await uploadFile(formdata)
    }
    
    const handleChange = async e => {
        setbusyness(e.target.value)
        await update({status:e.target.value})
    }
    const handleChangeLocation = async e => {
        setLocation(e.target.value)
        await update({location:e.target.value})
    }
    return (
        <>
            <NavbarProfile />
            <div className='bg-light d-flex justify-content-center' style={{paddingTop:'76px', minHeight:'100vh'}}> 
                <Paper elevation={5} className='my-5 bg-white w-75' style={{minHeight:'60vh'}}>
                    <div className='d-flex justify-content-between align-items-center py-3'>
                        <div className='d-flex'>
                            <Tooltip open={!user.photo} title="Ustonavite foto profilya" arrow placement="top">
                                <div className='m-3 avatar-wrapper' style={{position:"relative", width:'56px',height:'56px'}}>
                                    <Avatar  src={user.photo&&`${server}static/images/`+user.photo}  sx={{width:56,height:56, position:'absolute'}} className='bg-warning'>
                                        { user? user.name.slice(0,1).toLocaleUpperCase() :null}
                                    </Avatar>
                                    {user.photo?
                                    <div className='edit-delete justify-content-center align-items-center w-100' style={{height:"inherit", position:"absolute"}}>
                                        <label htmlFor="icon-button-file">
                                            <Input2 accept="image/*" onChange={handleFile} id="icon-button-file" type="file" />
                                            <EditIcon style={{cursor:"pointer"}} />
                                        </label>
                                        <DeleteIcon onClick={() => deleteFile('image')} style={{cursor:"pointer"}} />
                                    </div>:<Input onChange={handleFile} sx={{opacity:'0', position:'absolute'}} accept="image/*" id="contained-button-file" multiple type="file" />
                                    }
                                </div>
                                
                            </Tooltip>
                            <div className='d-flex flex-column justify-content-center'>
                                <div className=''>
                                    <input 
                                    onInput={e => setName(e.target.value)} 
                                    onFocus={() => setOkBtn(prev=>({...prev, name:true}))} 
                                    onBlur={() => setOkBtn(prev=>({...prev, name:false}))} 
                                    onKeyUp={e => {
                                        if(e.key === 'Enter')
                                            handleName()  
                                    }}
                                    value={name} 
                                    className='border-0 text-muted py-2' 
                                    style={{fontSize:"1em", outline:"none"}} />
                                    {okBtn.name&&<Button onClick={handleName} className={`text-muted`}>Ok</Button>}
                                </div>
                                <Typography variant="body2" className="" color="text.secondary" > 
                                    {user ? user.phone :null} 
                                </Typography>
                            </div>
                        </div>
                        <div>
                            
                                <CopyToClipboard text={`http://localhost:3000/user/${user.id}`}
                                    onCopy={() => dispatch(setSuccess('Copied'))}>
                                    <Button variant='filled'className="bg-dark text-white">
                                        Copy url
                                    </Button>
                                </CopyToClipboard>
                            <Button variant='filled' onClick={() => navigate(`/user/${user.id}`)} className="bg-warning mx-4">
                                See public view
                            </Button>
                        </div>
                        
                    </div>
                    <Divider />
                    <div className='row m-0 p-0'>
                        <div className='col-3 px-0' style={{borderRight:'1px solid #f8f9fa'}}>
                            <div className='p-2'>
                                <div className='d-flex justify-content-center align-items-center py-3'>
                                    <AccessTimeFilledIcon />
                                    <FormControl >
                                        <NativeSelect
                                            size="small"
                                            value={busyness}
                                            placeholder='zanyotost'
                                            onChange={handleChange}
                                            className="mx-2"
                                            sx={{textAlign:'center'}}
                                        >
                                            <option value={0}>Svoboden</option>
                                            <option value={1}>Nemnogo zanyat</option>
                                            <option value={2}>Vremenno ne rabotayu</option>
                                            <option value={3}>Mogu rabotat udalyonna</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className='d-flex align-items-center pb-3'>
                                    <LocationOnIcon />
                                    <FormControl >
                                        <NativeSelect
                                            size="small"
                                            value={location}
                                            placeholder='zanyotost'
                                            onChange={handleChangeLocation}
                                            className="mx-2"
                                            sx={{textAlign:'center'}}
                                        >
                                            {regions.map((e, i) => (
                                                <option key={i} value={e.label}>{e.label}</option>
                                            ))}
                                            
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='bg-light' style={{minHeight:'70vh'}}>
                                <List>
                                    <ListItemButton sx={{background:tab===1?"#f0f0f0":''}} onClick={() => dispatch(setTab(1))} >
                                        <CreateIcon />
                                        <span className="px-3">Resume</span> 
                                    </ListItemButton>
                                    <ListItemButton sx={{background:tab===2?"#f0f0f0":''}} onClick={() => dispatch(setTab(2))} >
                                        <HistoryIcon />
                                        <span className="px-3">Otkliki</span> 
                                    </ListItemButton>
                                    <ListItemButton sx={{background:tab===3?"#f0f0f0":''}} onClick={() => dispatch(setTab(3))} >
                                        <VideocamIcon />
                                        <span className="px-3">Moe Video</span> 
                                    </ListItemButton>
                                </List>
                            </div>
                        
                        </div>
                        <div className='col px-0'>
                            {tab===1&&<Resume />}
                            {tab===2&&<History />}
                            {tab===3&&<OwnVideo />}
                        </div>
                    </div>
                </Paper>
            </div>
        </>
    )
}