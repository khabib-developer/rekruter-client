/* eslint-disable jsx-a11y/anchor-is-valid */
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setDrawer, setModalAnswer, setProposal, setTab } from '../../redux/actions'

import Draggable from 'react-draggable'
import { useProposal } from '../../hooks/proposal.hook'
import { types } from '../tabcontent/form'

import DateObject from 'react-date-object'
import LongMenu from './menu'

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './style.css'

const RenderAnswers = ({structure, value}) => {
    if(structure) {
        switch(structure.type) {
            case types.file:
                return (
                    <div className='pt-1'>
                        {value!==''?
                        <a href={value} className="text-success" target="_blank" rel="noreferrer" >{structure.text}</a>
                        :`${structure.text} нету`}
                    </div>
                )
            case types.checkbox:
                return (
                    <div className='pt-1'>
                        {structure.text}: <span className='text-muted'>{Object.values(value).join(', ')}</span>
                    </div>
                )
            case types.calendar:
                const date = new DateObject(value)
                return (
                    <div className='pt-1'>
                        {structure.text}: <span className='text-muted'>{date.format("YYYY.MM.DD hh:mm")}</span>
                    </div>
                )
    
            default: 
                return (
                    <div className='pt-1'>
                        {structure.text}: <span className='text-muted'>{value}</span>
                    </div>
                )
        }
    }
    return <>loading...</>
}


export const Proposal = ({e, date1, date2, row, data}) => {

    const dispatch = useDispatch()

    const {proposals} = useSelector(s => s.ui)

    const [position, setposition] = useState({x:0,y:0})

    const [x, setX] = useState(0)

    const {updateBid} = useProposal()

    const dragStartHandler = (event) => {
        // console.log(event.clientX)
        setX(event.clientX)
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    const dragEndHandler = async (event, obj) => {
        const stir = async status => {
            if(status === obj.status) return
            // const array = [
            //     ...proposals.filter(e => e.id !== obj.id),
            //     {...obj, status}
            // ]
            setposition({})
            // setposition({x: event.clientX - x - 100})

            await updateBid({status, id:obj.id}, obj.token)
        }
        

        if((event.clientX - x)/(row.clientWidth/4) === 0) 
            return 

        if((event.clientX - x)/(row.clientWidth/4) < -2.47) {
            await stir(0)
        }
        else if( (event.clientX - x)/(row.clientWidth/4) > -2.47 && (event.clientX - x)/(row.clientWidth/4) < -1.47 ) {
            await stir(obj.status>2?obj.status-2:0)
        }

        else if( (event.clientX - x)/(row.clientWidth/4) < -0.47 ) {
            await stir(obj.status-1>0?obj.status-1:0)
        }
        else if( (event.clientX - x)/(row.clientWidth/4) > 0.59 && (event.clientX - x)/(row.clientWidth/4) < 1.6 ) {

            await stir(obj.status<3?obj.status+1:3)
        }
        else if( (event.clientX - x)/(row.clientWidth/4) > 1.6 && (event.clientX - x)/(row.clientWidth/4) < 2.59 ) {

            await stir(obj.status<2?obj.status+2:3)
        }
        else if( (event.clientX - x)/(row.clientWidth/4) > 2.59) {

            await stir(3)

        } else {
            stir(obj.status)
        }
    }
    return (
        <Draggable
            disabled={!matches}
            onStart = {event => dragStartHandler(event, e)}  
            onStop = {event => dragEndHandler(event, e)}
            position = {position}
        >
            <Paper 
            elevation={3} 
            className="bg-white p-2 mt-1" 
            style={{fontSize:'0.85em',cursor:'move', transition:"all .15s ease"}}>
                {
                    data?
                    <>
                        <div className="from" style={{position:"relative"}}>
                            <div style={{zIndex:"10"}} className="bg-white" >
                                <div className='' style={{position:'relative'}} >
                                    <div>Форма: <span className='text-success' onClick={() => dispatch(setTab(4))} style={{cursor:"pointer"}}>{e.name_of_form}</span></div> 
                                    <div style={{position:"absolute", right:-5,top:-8}}><LongMenu id={e.id} status={e.status} answer={true} /></div>
                                </div>
                                <div>
                                    Дата отправки : <span className='text-muted'>{date1.format("YYYY.MM.DD hh:mm")}</span>
                                </div>
                                <div>
                                    Имя: <span className='text-muted'>{data.name}</span>
                                </div>
                                <div>
                                    Контакт: <span className='text-muted'><a className='text-success' href={`tel:${data.phone}`}>{data.phone}</a></span>
                                </div>
                                <div>
                                    Вакансия: <span className='text-muted'>{data.job}</span>
                                </div>
                            </div>
                            <a className='text-success py-1' href="#" onClick={() => dispatch(setModalAnswer(e))}>
                                Подробнее 
                            </a>
                        </div>

                    </>:
                    <>
                        <div className="from" style={{position:'relative'}}>
                            <span>Ot:</span>
                            <Link to={`/user/${e.user_id}`} className='text-success'>{e.name}</Link>
                            <div style={{position:"absolute", right:-8,top:-8}}><LongMenu id={e.id} answer={false} /></div>
                        </div>
                        <div className="vacancy">
                            <span>Vacancy:</span>
                            <a href="#job" className='text-success' onClick={() => dispatch(setDrawer(e.vacancy))}>{e.vacancy.title}</a>
                        </div>
                        <div className="dateOfPublic">
                            <span>Data publikatsii:</span>
                            <span className='text-muted'>{date1.format("YYYY/MM/DD hh:mm")}</span>
                        </div>
                        <div className="dateOfPublic">
                            <span>Data otklika:</span>
                            <span className="text-muted">{date2.format("YYYY/MM/DD hh:mm")}</span>
                        </div>

                        {e.text!==''?
                        <div className="dateOfPublic">
                            <span>Predlojenie:</span>
                            <span className='text-muted'>{e.text}</span>
                        </div>:null}
                    </>
                }
                
            </Paper>
        </Draggable>
        
    )
}

export const AnswerModal = () => {

    const {answerModal} = useSelector(s => s.ui)

    const dispatch = useDispatch()
    
    if(!answerModal) return <></>

    console.log(answerModal)

    return (
        <>
        <Dialog
            fullWidth={true}
            maxWidth={'xs'}
            scroll="paper"
            open={!!answerModal}
            onClose={() => dispatch(setModalAnswer(false))}
            >
                <DialogTitle>Дополнительная информация</DialogTitle>
                    <DialogContent>
                        <div className='pb-2'>
                            <div>Изображение:</div> 
                            <div className='text-muted w-100 pt-1'>
                                <img alt="img"  style={{borderRadius:"5px"}} src={JSON.parse(answerModal.data).image} className="w-100" />
                            </div>
                        </div>
                        {Object.keys(JSON.parse(answerModal.data))
                        .filter(e => e!=='name'&&e!=='phone'&&e!=='job'&&e!=='image')
                        .map((item, i) => <RenderAnswers structure={JSON.parse(answerModal.structure).find(e => e.text === item)} key={i} value={JSON.parse(answerModal.data)[item]} />)}
                    </DialogContent>
                <DialogActions>
                <Button onClick={() => dispatch(setModalAnswer(false))}>Закрыт</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}