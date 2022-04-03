import { Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setDrawer } from "../../redux/actions";
import { Filtr } from "../Filtr";
import { Proposals } from "../Proposals";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useProposal } from "../../hooks/proposal.hook";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AnswerModal } from "../Proposals/proposal";

export const CRM = ({width}) => {
    const ref = useRef(null)
    const dispatch = useDispatch()
    const location = useLocation()
    const [history, setHistory] = useState(false)

    const [element, setElement] = useState(null)

    const [filter, setfilter] = useState(false)

    const [permission, setpermission] = useState(false)

    const {getBid} = useProposal()

    const {proposals} = useSelector(s => s.ui)

    useEffect(() => {
        if(location.hash === '#job') {
            setHistory(true)
        }
        if(history) {
            dispatch(setDrawer(false))
            setHistory(false)
        }
    }, [location])

    

    useEffect(() => {
        (async function f() {
            const res = await getBid()
            if(res) {
                setElement(ref.current)
                setpermission(true)
            }
        }())

    }, [])


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));


    return (
        <div style={{width, transition:'all .4s ease', overflow:"scroll-x",minWidth:"1200px"}} className='d-flex justify-content-center px-0'>
            <div className='crm mx-0' style={{width:"95%"}}>
                
                <div className="pb-3">
                    <Paper className="w-100 d-flex align-items-center py-1 px-2 filter" 
                    style={{overflow:!matches?"scroll":'hidden',background:"#FFF",borderRadius:"6px"}}>
                        <div className="my-auto" style={{cursor:'pointer'}} onClick={() => setfilter(prev => !prev)} >Фильтр</div> 
                        <ArrowBackIosIcon 
                        onClick={() => setfilter(false)}
                        style={{cursor:'pointer',display:filter?'block':'none'}} 
                        fontSize="10px" className="mx-2" /> 
                        <ArrowForwardIosIcon
                        onClick={() => setfilter(true)}
                        style={{cursor:'pointer',display:filter?'none':'block'}}  
                        fontSize="10px" className="mx-2" /> 
                            <div
                                style={{transition:"all .3s ease",marginLeft: filter?"0%":"-100%"}}
                            ><Filtr /></div>
                        </Paper> 
                </div>
                <div className="row" ref={ref}>
                    {
                        !permission?
                        <></>:
                        <>
                            <div className="col">
                                <div className="title text-center pb-1" style={{borderBottom: '1px solid #ccc'}}>
                                    <Typography variant="body2" className="text-uppercase" style={{letterSpacing:'2px',fontWeight:'bold'}} color="text.secondary" > 
                                        НЕРАЗОБРАННОЕ
                                    </Typography>
                                    <Typography variant="body2" className="py-1" color="text.secondary" > 
                                        Заявок : {proposals.filter(e => e.state === null).filter(e => e.status === 0).length}
                                    </Typography>
                                </div>
                                <Proposals row={element} status={0} answer={proposals} />

                            </div>
                            
                            <div className="col">
                                <div className="title text-center pb-1" style={{borderBottom: '1px solid orange'}}>
                                    <Typography variant="body2" className="text-uppercase" style={{letterSpacing:'2px',fontWeight:'bold'}} color="text.secondary" > 
                                        ПЕРВИЧНЫЙ КОНТАКТ
                                    </Typography>
                                    <Typography variant="body2" className="py-1" color="text.secondary" > 
                                        Заявок : {proposals.filter(e => e.state === null).filter(e => e.status === 1).length}
                                    </Typography>
                                </div>
                                <Proposals row={element} status={1} answer={proposals} />
                            </div>
                            <div className="col">
                                <div className="title text-center pb-1" style={{borderBottom: '1px solid #e9e213'}}>
                                    <Typography variant="body2" className="text-uppercase" style={{letterSpacing:'2px',fontWeight:'bold'}} color="text.secondary" > 
                                        ПЕРЕГОВОРЫ
                                    </Typography>
                                    <Typography variant="body2" className="py-1" color="text.secondary" > 
                                        Заявок : {proposals.filter(e => e.state === null).filter(e => e.status === 2).length}
                                    </Typography>
                                </div>
                                <Proposals row={element} status={2} answer={proposals} />
                            </div>
                            <div className="col">
                                <div className="title text-center pb-1" style={{borderBottom: '1px solid green'}}>
                                    <Typography variant="body2" className="text-uppercase" style={{letterSpacing:'2px',fontWeight:'bold'}} color="text.secondary" > 
                                        СОГЛАСОВАНИЕ ДОГОВОРА
                                    </Typography>
                                    <Typography variant="body2" className="py-1" color="text.secondary" > 
                                        Заявок : {proposals.filter(e => e.state === null).filter(e => e.status === 3).length}
                                    </Typography>
                                </div> 
                                <Proposals row={element} status={3} answer={proposals} />
                            </div>
                        </>
                    }
                    <AnswerModal />
                </div>
            </div>
        </div>
    )
}