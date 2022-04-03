import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/auth.hook";
import { setLogin, setTab, setUserData } from "../redux/actions";

import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'

import StorageIcon from '@mui/icons-material/Storage';
import CreateIcon from '@mui/icons-material/Create';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArchiveIcon from '@mui/icons-material/Archive';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HistoryIcon from '@mui/icons-material/History';
import Logout from '@mui/icons-material/Logout';

import LockOpenIcon from '@mui/icons-material/LockOpen';

export const MenuAvatar = ({name}) => {
    const [anchorEl, setAnchorEl] = useState(false)
    const {logout} = useAuth()
    const {user, server} = useSelector(s => s.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = async () => {
        localStorage.clear()
        dispatch(setUserData(null))
        dispatch(setLogin(null))
        logout()
        navigate('/')
    }
    const navigatePlusTab = i => {
        navigate('/profile')
        dispatch(setTab(i))
    }
    return (
        <>
            <Tooltip title="Account Settings">
                <IconButton onClick={handleClick} size="small" sx={{ml:2}}>
                    <Avatar src={user&&(user.photo&&`${server}static/images/`+user.photo)} sx={{ width: 32, height: 32 }}>{name ? name.slice(0,1).toLocaleUpperCase() :null}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                <MenuItem onClick={() => navigate('/profile')}>
                    <Avatar src={user&&(user.photo&&`${server}static/images/`+user.photo)} /> {name}
                </MenuItem>
                    <Divider />
                <MenuItem onClick={() => navigatePlusTab(1)}>
                    {user.type===0?
                        <div>
                            <ListItemIcon>
                                <CreateIcon fontSize="small" />
                            </ListItemIcon> 
                            Создать вакансию
                        </div> :
                        <div>
                            <ListItemIcon>
                                <CreateIcon fontSize="small" />
                            </ListItemIcon> 
                            Резюме
                        </div>
                    }
                </MenuItem>
                <MenuItem onClick={() => navigatePlusTab(2)}>
                    {user.type===0?
                        <div>
                            <ListItemIcon>
                                <StorageIcon fontSize="small" />
                            </ListItemIcon> 
                            Сделки
                        </div> :
                        <div>
                            <ListItemIcon>
                                <HistoryIcon fontSize="small" />
                            </ListItemIcon>
                            История
                        </div>
                    }
                    
                </MenuItem>
                <MenuItem onClick={() => navigatePlusTab(3)}>
                {user.type===0?
                    <div>
                        <ListItemIcon>
                            <AddBoxIcon fontSize="small" />
                        </ListItemIcon> 
                        Создать форму
                    </div> :
                    <div>
                        <ListItemIcon>
                            <VideocamIcon fontSize="small" />
                        </ListItemIcon>
                        Видео 
                    </div>
                }
                </MenuItem>
                {
                    user.type===0&&
                    <div>
                        <MenuItem onClick={() => navigatePlusTab(4)}>
                            <ListItemIcon>
                                <HistoryIcon fontSize="small" />
                            </ListItemIcon> 
                            Мои формы
                        </MenuItem>
                        <MenuItem onClick={() => navigatePlusTab(6)}>
                            <ListItemIcon>
                                <ArchiveIcon fontSize="small" />
                            </ListItemIcon> 
                            Архив
                        </MenuItem>
                        <MenuItem onClick={() => navigatePlusTab(7)}>
                            <ListItemIcon>
                                <LockOpenIcon className="text-danger" />
                            </ListItemIcon> 
                            Доступ к сайту
                        </MenuItem>
                    </div>
                }
                <MenuItem  onClick={logOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    )
}