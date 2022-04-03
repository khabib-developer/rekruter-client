import { Avatar, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import { useAuth } from '../hooks/auth.hook'
import { MenuAvatar } from './Menu'
import { setLogin, setTab, setUserData } from "../redux/actions";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//icons
import ArchiveIcon from '@mui/icons-material/Archive';
import LoginIcon from '@mui/icons-material/Login';
import StorageIcon from '@mui/icons-material/Storage';
import CreateIcon from '@mui/icons-material/Create';
import VideocamIcon from '@mui/icons-material/Videocam';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Logout from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';



export const Navbar = () => {
    const {user, server} = useSelector(s => s.app)
    const [link, setLink] = useState(null)
    const {tab} = useSelector(s => s.ui)

    const navigate = useNavigate()

    const {logout} = useAuth()

    const dispatch = useDispatch()

    const [mobilemenu, setmobilemenu] = useState(false)

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setmobilemenu(false)
      };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        if(user) {
            setLink('/profile')
        } else {
            setLink(null)
        }
        
    }, [link, user])

    const navigatePlusTab = i => {
        navigate('/profile')
        dispatch(setTab(i))
        setmobilemenu(false)
    }

    const logOut = async () => {
        localStorage.clear()
        dispatch(setUserData(null))
        dispatch(setLogin(null))
        logout()
        navigate('/')
        setmobilemenu(false)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light py-3">
                <div className="container">
                    <div className="d-flex justify-content-between w-100">
                        <Link className="navbar-brand px-md-0 px-1 d-flex align-items-center" style={{fontWeight:"300"}} to="/">Rekruter</Link>
                        
                        <div className="" id="navbarSupportedContent">
                        
                             {link&&user?
                                !matches?
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={() => setmobilemenu(true)}
                                >
                                    <MenuIcon />
                                </IconButton>:
                                <MenuAvatar name={user?user.name:null} />:
                                <Link to='/login' className="btn btn-outline-secondary px-3" style={{borderRadius:"10px"}} type="button"> <span className='px-2'>Начать</span> <LoginIcon /></Link>
                            }
                            {
                                !matches&&user&&
                                <Drawer
                                    anchor={'right'}
                                    open={mobilemenu}
                                    onClose={toggleDrawer}
                                >
                                    <List
                                        sx={{ width: 300, bgcolor: 'background.paper' }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        // subheader={
                                        //     <ListSubheader component="div" id="nested-list-subheader">
                                        //     Nested List Items
                                        //     </ListSubheader>
                                        // }
                                        >
                                            <ListItemButton sx={{background:tab===5?"#f0f0f0":''}} onClick={() => navigatePlusTab(5)}>
                                                <ListItemIcon>
                                                <Avatar size="small" src={user&&(user.photo&&`${server}static/images/`+user.photo)} />
                                                </ListItemIcon>
                                                <ListItemText primary="Профиль" />
                                            </ListItemButton>
                                            <ListItemButton sx={{background:tab===1?"#f0f0f0":''}} onClick={() => navigatePlusTab(1)} >
                                                <ListItemIcon>
                                                <CreateIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary={user.type===0?"Создать вакансию":"Резюме"} />
                                            </ListItemButton>
                                            <ListItemButton sx={{background:tab===2?"#f0f0f0":''}} onClick={() => navigatePlusTab(2)} >
                                                <ListItemIcon>
                                                    {user.type===0?
                                                        <StorageIcon fontSize="small" />:
                                                        <HistoryIcon fontSize="small" />
                                                    }
                                                </ListItemIcon>
                                                <ListItemText primary={user.type===0?"Сделки":"История"} />
                                            </ListItemButton>
                                            <ListItemButton sx={{background:tab===3?"#f0f0f0":''}} onClick={() => navigatePlusTab(3)}>
                                                <ListItemIcon>
                                                    {user.type===0?
                                                        <AddBoxIcon fontSize="small" />:
                                                        <VideocamIcon fontSize="small" />
                                                    }
                                                </ListItemIcon>
                                                <ListItemText primary={user.type===0?"Создать форму":"Видео"} />
                                            </ListItemButton>
                                            {
                                                user.type===0&&
                                                <>
                                                    <ListItemButton sx={{background:tab===4?"#f0f0f0":''}} onClick={() => navigatePlusTab(4)}>
                                                        <ListItemIcon>
                                                        <HistoryIcon fontSize='small' />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Мои формы" />
                                                    </ListItemButton>
                                                    <ListItemButton sx={{background:tab===6?"#f0f0f0":''}} onClick={() => navigatePlusTab(6)}>
                                                        <ListItemIcon>
                                                        <ArchiveIcon fontSize='small' />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Архив" />
                                                    </ListItemButton>
                                                    <ListItemButton sx={{background:tab===6?"#f0f0f0":''}} onClick={() => navigatePlusTab(7)}>
                                                        <ListItemIcon>
                                                        <LockOpenIcon className="text-danger" fontSize='small' />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Доступ к сайту" />
                                                    </ListItemButton>
                                                
                                                </>
                                                
                                            }
                                            <ListItemButton onClick={logOut}>
                                                <ListItemIcon>
                                                    <Logout fontSize='small' />
                                                </ListItemIcon>
                                                <ListItemText primary="Выйти" />
                                            </ListItemButton>
                                    </List>
                                </Drawer>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}