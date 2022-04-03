import React, { useState } from 'react';
import DateObject from "react-date-object";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Avatar, Divider, IconButton, List, ListItem, ListItemButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { BackgroundLoader } from '../../components/pre-loader/BackDrop';
import BlockIcon from '@mui/icons-material/Block';

export default function Modal({user, setOpen}) {

    const {server} = useSelector(s => s.app)

    const [state, setState] = useState(1)

    const handleClose = () => {
        setOpen(false);
    };


    if(user) {
        return (
            <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                scroll="paper"
                open={!!user}
                onClose={handleClose}
            >
                <DialogTitle>Дополнительная информация</DialogTitle>
                <DialogContent>
                <div className='pb-3 d-flex' >
                    <IconButton size="">
                        <Avatar src={user?(user.photo&&`${server}static/images/`+user.photo):null} sx={{ width: 50, height: 50 }}>{user ? user.name.slice(0,1).toLocaleUpperCase() :null}</Avatar>
                    </IconButton>
                    <div className='d-flex flex-column px-2 justify-content-center text-muted'>
                        <div>{user.name}</div>
                        <div>{user.phone}</div>
                    </div>
                    <div style={{fontWeight:"200",fontSize:"1.8rem"}} className="px-5 d-flex align-items-center" >
                        <span className='px-2'>Формы:</span> {user.forms.length}
                    </div>
                    <div style={{fontWeight:"200",fontSize:"1.8rem"}} className="px-5 d-flex align-items-center" >
                        <span className='px-2'>Предложения:</span> {user.proposals.length}
                    </div>
                </div>
                <div className='d-flex pb-1 px-2' style={{fontWeight:"300"}}>
                    <div style={{cursor:'pointer'}} onClick={() => setState(1)} className={`${state===1?"text-success":"text-muted"}`}>
                        История
                    </div>
                    <div style={{cursor:'pointer'}} onClick={() => setState(2)} className={`px-4 ${state===2?"text-success":"text-muted"}`}>
                        Формы 
                    </div>
                </div>
                <Divider />
                <div className='pt-3 px-2'>
                    {
                        state===1?
                        <div className='d-flex'>
                            <List className="pt-0 w-100">
                                {
                                    user.history.map((item, i) => {
                                        const start = new DateObject(+item.start)
                                        const stop = new DateObject(+item.stop)

                                        const strt = new Date(+item.start)
                                        const stp = new Date(+item.stop)
                                        return (
                                            <div  key={i}>
                                                <ListItem disablePadding >
                                                    <ListItemButton className="d-flex">
                                                        <div className="col-4"> 
                                                            {start.format('YYYY.MM.DD')} {strt.toString().slice(16,21)}
                                                        </div>
                                                        <div className="col-4"> 
                                                            {
                                                                Math.round( (+item.stop - +item.start) / 86400000 )
                                                            } дней (округленно)
                                                        </div>
                                                        <div className="col-4"> 
                                                            {stop.format('YYYY.MM.DD')} {stp.toString().slice(16,21)}
                                                        </div>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        )
                                    })
                                }
                            </List>
                        </div>:
                        <div>
                            <List className="pt-0 2-100">
                                {user.forms.length===0&&<div className="text-danger">У этого пользователя нет реферальных форм</div>}
                                {user.forms.map((item, i) => {
                                    const date = new DateObject(+item.date)
                                    return (
                                        <div key={i}>
                                        <ListItem disablePadding >
                                            <ListItemButton className="d-flex">
                                                <div className="col-4"> 
                                                    <a  className="text-muted"
                                                        href={`${window.location.origin}/form/${item.token}`} 
                                                        target="_blank" rel="noreferrer">{item.title}
                                                    </a>
                                                </div>
                                                <div className="col-4"> 
                                                    <div>{date.format("MM.DD.YYYY")}</div>
                                                </div>
                                                <div className="col-4 text-end"> 
                                                    <IconButton onClick={() => console.log(2)} className="text-danger" >
                                                        <BlockIcon />  
                                                    </IconButton>
                                                </div>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        </div>
                                    )
                                })}
                            </List>
                        </div>
                    }
                </div>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Закрыт</Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        );
    }

    return <BackgroundLoader />

  
}