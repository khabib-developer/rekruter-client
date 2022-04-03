import { Button, ButtonGroup, Chip, Modal, Stack, TextareaAutosize, Typography } from "@mui/material";
import { Markup } from "interweave";
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useEffect, useState } from "react";
import DateObject from "react-date-object";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import { setDrawer, setWarning } from "../../redux/actions";

import './style.css'
import { Box } from "@mui/system";
import { style } from "../tabcontent/create-vacancy";
import { useProposal } from "../../hooks/proposal.hook";

const colors = ['info', 'warning', 'secondary', 'error', 'primary', 'default']

export const SwipeDrawer = () => {
    const {drawer} = useSelector(s => s.ui)
    const {login} = useSelector(s => s.app)
    const {createBid} = useProposal()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [modal, setModal] = useState(false)

    const handleClose = e => {
        if(e.target.classList.contains('modal-wrapper')) {
            if(location.hash === '#job') {
                navigate(location.pathname)
            }
            dispatch(setDrawer(false))
        }
    }
    useEffect(() => {
        if(!drawer&&location.hash === '#job') {
            navigate(location.pathname)
        }
        // if(drawer.text && drawer.text !== '') {
        //     setText(drawer.text)
        // }
    }, [])

    useEffect(() => {
        if(!drawer) {
            setText('')
        }
    }, [drawer])

    const requestToVacancy = async () => {
        setModal(false)
        await createBid({vacancy_id:drawer.id, text})
    }
    const checkAuth = () => {
        if(login) {
            setModal(true)
        } else {
            dispatch(setWarning("Posle registratsii vi mojete otkliknutysa"))
        }
    }

    const handleClick = () => false
    const date = drawer&&new DateObject(+drawer.date)
    
    return (
        <div onClick={handleClose} className={`modal-wrapper ${!drawer?'close-modal-wrapper':''}`}>
            <div className={`own-modal ${!drawer?'close-modal':''}`} >
                {
                drawer?
                <div className="row p-0 m-0 pt-5">
                    <div className="col-md-9 col-12 mx-md-4 mx-0">
                        <h4 className="d-flex flex-column dlex-md-row justify-content-start" style={{fontWeight:"300"}}>{drawer.title} - <span className="text-success px-1">{drawer.type}</span></h4>
                        <div className="pt-3 text-black" style={{textAlign:'left',minHeight:'30vh'}}>
                            <Markup content={drawer.description} />
                        </div>
                        <div className="skills d-flex flex-md-row flex-column align-items-md-center">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Требуемые навыки: 
                            </Typography>
                            <Stack direction="row" spacing={0.5} className="px-md-2 px-0 py-md-0 py-2 d-flex flex-wrap">
                                {drawer.skills? 
                                    JSON.parse(drawer.skills).map((e, i) => (
                                        <Chip key={i} color={colors[Math.floor(Math.random() * (5 + 1))]} onClick={handleClick} label={e} />
                                    )):'netu'
                                }
                            </Stack>
                        </div>
                        <div className="skills d-flex flex-md-row flex-column align-items-md-center pt-3">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Требуемые языки: 
                            </Typography>
                            <Stack direction="row" spacing={0.5} className="px-md-2 px-0 py-md-0 py-2 d-flex flex-wrap">
                                {drawer.language? 
                                    JSON.parse(drawer.language).map((e, i) => (
                                        <Chip key={i} color={colors[Math.floor(Math.random() * (5 + 1))]} onClick={handleClick} label={`${e.language} - ${e.level}`} />
                                    )):'netu'
                                }
                            </Stack>
                        </div>
                        <Typography variant="body2" color="text.secondary" className="py-3 pb-4" > 
                            Mestopolojenie: {drawer.place}, Zarplata: {JSON.parse(drawer.salary).from} - {JSON.parse(drawer.salary).to} {JSON.parse(drawer.salary).currency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" > 
                            Data publikatsii: {date.format("YYYY/MM/DD hh:mm")}
                        </Typography>
                        {!drawer.bid?<div className="messageTOEmployer">
                            <Typography variant="body2" color="text.secondary" className="py-3 pb-4" > 
                                Napishite pro sebya, tochnee vsego "Хвалите себя" (необязательные поля)
                            </Typography>
                            <TextareaAutosize
                                variant="filled"
                                readOnly={drawer.bid}
                                aria-label="minimum height"
                                className="p-3 text-secondary w-md-50 w-100"
                                value={text}
                                onInput={e => setText(e.target.value)}
                                minRows={2}
                                placeholder="Text"
                                style={{ border: 'none', outline:'none',backgroundColor:'rgba(0,0,0,0.06)', borderRadius:'6px' }}
                            />
                        </div>:
                        <Typography variant="body2" color="text.secondary" className="py-3 pb-4" > 
                            Vash text: {drawer.text}
                        </Typography>
                        }
                        <div className="py-4">
                            <Modal
                                open={modal}
                                onClose={() => setModal(false)}
                                aria-labelledby="modal-modal-title-publish"
                                aria-describedby="modal-modal-description-publish"
                            >
                                <Box sx={{...style, width: '600px'}}>
                                    <Typography id="modal-modal-title-publish" variant="h6" className="text-secondary" component="h2">
                                        Rabotadatel uvidet tvau zayavku, esli podxodish on s toboy svyazatsya
                                    </Typography>
                                    <div className="d-flex justify-content-end">
                                        <ButtonGroup variant="text" aria-label="text button group">
                                            <Button className="text-secondary" onClick={requestToVacancy}>Yes</Button>
                                            <Button className="text-secondary" onClick={() => setModal(false)}>No</Button>
                                        </ButtonGroup>
                                    </div>
                                    
                                </Box>

                            </Modal>
                            {!drawer.bid&&
                            <Button variant="filled" onClick={checkAuth} className=" px-3 bg-warning" style={{fontWeight:'300'}}>
                                Otkliknutsya
                            </Button>
                            }
                            
                        </div>
                        

                    </div>
                    <div className="col">
                        <h4 className="d-flex justify-content-start" style={{fontWeight:"300"}}>Kontaktnie dannie</h4>
                        
                        <div className="pt-3 text-muted" style={{textAlign:'left',minHeight:'30vh'}}>
                            {drawer.contact?
                            'Rabotadatel skril svoy nomer':
                            <a className="text-info" style={{textDecoration:"none"}} href={`tel:${drawer.user_phone}`}><PhoneIcon />{` ${drawer.user_phone}`}</a>
                            }
                           
                        </div>
                    </div>
                </div>:'dannie ne zagruzilis'
                }
                
            </div>
        </div>
    )
}