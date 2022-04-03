import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { MenuAvatar } from './Menu'
import { setSideBarView } from '../redux/actions';

export const NavbarProfile = () => {
    const {sideBarShow} = useSelector(s => s.ui)
    const dispatch = useDispatch()
    const {user} = useSelector(s => s.app)
    const [userdata, setUserdata] = useState({name:"K"})
    useEffect(() => {
        if(user !== {}) 
            setUserdata(user)
    }, [user])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light py-3" style={{position:'fixed',width:'100%',background:"#fff",zIndex:10}}>
                <div className="container">
                    <div className="d-flex justify-content-between w-100">
                        <div className='d-flex align-items-center'>
                            {
                                user.type===0?
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    // sx={{ mr: 2 }}
                                    onClick={() => dispatch(setSideBarView(!sideBarShow))}
                                >
                                    <MenuIcon />
                                </IconButton>:null
                            }
                            
                            <Link className="navbar-brand px-2" to="/">Rekruter</Link>
                        </div>
                        
                        
                        <div className="" id="">
                            <MenuAvatar name={userdata?userdata.name:null} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}