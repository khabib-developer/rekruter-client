import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { LineChart } from "../Charts/lineChart";
import { PieChart } from "../Charts/pie";
import { StackedBar } from "../Charts/stackedBar";
import DatePicker from '@mui/lab/DatePicker';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './style.css'
import { useProposal } from "../../hooks/proposal.hook";

export const Statistic = ({width}) => {
    const {stockProposals} = useSelector(s => s.ui)
    const {form, vacancy} = useSelector(s => s.app)
    const [today, settoday] = useState(null)

    const [from , setfrom] = useState(new Date(Date.now() - 604800000))
    const [to , setto] = useState(new Date())

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    const [permission, setpermission] = useState(false)

    const {getBid} = useProposal()

    useEffect(() => {
        (async function f() {
            const res = await getBid()
            if(res) {
                setpermission(true)
            }
        }())
    }, []) 

    
    useEffect(() => {
        const date = new Date()
        
        const arr = stockProposals.filter(e => e.name_of_form).filter(e => {
            const d = new Date(+e.date)
            return date.getDate() === d.getDate()
        }).length
        const arr1 = stockProposals.filter(e => !e.name_of_form).filter(e => {
            const d = new Date(+e.date)
            return date.getDate() === d.getDate()
        }).length

        settoday(arr+arr1)
    }, [settoday, stockProposals])

    if(!permission) return <>loading...</>

    return (
        <div style={{width, transition:'all .4s ease'}} className='d-flex px-0 px-lg-5 flex-column '>
            
            <div className="d-flex justify-content-around row mx-0 py-1 py-lg-3 px-2 ">
                <div className="p-3 text-muted text-center statistic-info mx-lg-3 bg-white col-lg col-5">
                    <div className="">
                        Реферальные <br /> ссылки 
                    </div>
                    <div>
                        {form.length}
                    </div>
                </div>
                <div className="p-3 text-center text-muted statistic-info mx-lg-3 bg-white col-lg col-5">
                    <div>
                        Вакансии  
                    </div>
                    <div>
                        <br />
                        {vacancy.length}
                    </div> 
                </div>
                <div className="p-3 text-center text-muted statistic-info mx-lg-3 bg-white col-lg col-5 my-lg-0 my-3">
                    <div>
                        Все cделки  
                    </div>
                    <div>
                    <br />
                        {stockProposals.length}
                    </div> 
                </div>
                <div className="p-3 text-center text-muted statistic-info mx-lg-3 bg-white col-lg col-5 my-lg-0 my-3">
                    <div>
                        Активные сделки 
                    </div>
                    <div>
                        <br />
                        {stockProposals.filter(e => e.state === null).length}
                    </div> 
                </div>
                <div className="p-3 text-center text-muted statistic-info mx-lg-3 bg-white col-lg col-5">
                    <div>
                        Сегодняшние <br /> сделки 
                    </div>
                    <div>
                        {today} 
                    </div> 
                </div>
            </div>

            <div className="row mx-0 d-flex justify-content-center px-0  py-lg-0 py-3">
                <div className="p-3 statistic-info bg-white col-lg col-12" style={{maxWidth:!matches?"94%":"47%"}}>
                    <PieChart arr={stockProposals} />
                </div>
                {
                    matches&&
                    <div className="p-3 mx-3 statistic-info bg-white col-lg col-12" style={{maxWidth:"48%"}}>
                        <StackedBar labels={form} proposals={stockProposals} />
                    </div>
                }
                
            </div>

            {
                matches&&
                <div className="py-4">
                    <LineChart proposals={stockProposals} forms={form} from={from} to={to}  />

                    <div className="px-3 py-3 d-flex align-items-center ">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className="d-flex align-items-center" >
                                <div>From: </div>
                                <div className="px-3">
                                    <DatePicker
                                        disableFuture
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={from}
                                        onChange={(newValue) => {
                                            if(to - newValue >= 604800000) {
                                                setfrom(newValue);
                                            }
                                            return null
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                        />
                                </div>
                            </div>
                            <div className="d-flex align-items-center" >
                                <div>to: </div>
                                <div className="px-3">
                                    <DatePicker
                                        disableFuture
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={to}
                                        onChange={(newValue) => {
                                            if(newValue - from >= 604800000) {
                                                setto(newValue);
                                            }
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                        />
                                </div>
                            </div>
                        </LocalizationProvider>
                    
                    </div>

                </div>
            }
            

        </div>
    )
}