import { Button, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import { Jobs } from "../components/jobs";
import { Navbar } from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useVacancy } from "../hooks/vacancy.hook";
import { setJobs } from "../redux/actions";

import './main.css'
import './paralax.css'
import { Link } from "react-router-dom";


const Content = () => {
    return (
        <div className="container-lg pt-5">
            <div className="row p-0 m-0 flex-column-reverse flex-lg-row" style={{minHeight:"100vh"}}>
                <Paper elevation={5} className="px-0 col-12 col-lg-9">
                {/* <div className="col-9 jobs-wrapper"> */}
                    <div className="p-3 mt-4">
                        <h2 className="px-2">Search Jobs</h2>
                        <div className="w-100 d-flex align-items-center" style={{position:"relative"}}>
                            <TextField className="p-0 w-100" variant="filled" size="small" hiddenLabel placeholder="search jobs" />
                            <SearchIcon sx={{position:"absolute",right:"16px"}} />
                        </div>
                    </div>
                    <div className="p-3 px-0">
                        {/* <div className="row p-0 m-0" style={{borderBottom:'1px solid #ccc'}}>
                            <div onClick={() => setSort(0)} className={`col-lg-1 col-3 text-secondary btn ${sort===0 && 'text-dark'}`}>Top</div>
                            <div onClick={() => setSort(1)} className={`col-lg-2 col-4 text-center text-secondary p-0 my-1 btn ${sort===1 && 'text-dark'}`} style={{borderLeft:'1px solid #ccc',borderRight:'1px solid #ccc'}}>Nedavniy</div>
                            <div onClick={() => setSort(2)} className={`col-lg-2 col-4 text-secondary btn ${sort===2 && 'text-dark'}`}>Cохранённые </div>
                        </div> */}
                        <div className="job-field py-3">
                            <Jobs />
                        </div>
                        
                    </div>
                </Paper>
                {/* </div> */}
                <div className="col-12 col-lg-3 py-lg-0 pb-4 px-0 px-lg-3" >
                    <Paper elevation={5} > 
                        <div className="p-4 text-center">
                            Vsyakie filtri
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export const Main = () => {
    const dispatch = useDispatch()
    const {read} = useVacancy()
    const {jobs} = useSelector(s => s.app)
    useEffect(() => {
        (async function f() {
          try {
            const jobs1 = await read(0)
            if(jobs1)
              dispatch(setJobs({...jobs, jobs1}))
          } catch (error) {
              console.log(error)
          }
        }())
    }, [])
    
    const [sort, setSort] = useState(0)
    return (
        <div className="paralax">
            
            <Navbar />
            <div className="d-flex justify-content-center align-items-center" style={{height:'calc(100vh - 200px)'}}>
                <div className="w-75">
                    <h1 className="text-dark" style={{fontWeight:"200"}}>
                        CRM, которую вы действительно хотели бы использовать
                    </h1>
                    <h3 className="w-75 pt-3" style={{fontWeight:"200"}}>
                        Автоматизируйте повторяющуюся работу, чтобы тратить больше времени на продажи.
                    </h3>
                    <Link to="/login" className="px-3 mt-4 btn btn-outline-dark" style={{borderRadius:"10px",fontWeight:"200"}}>
                        Начать 30 дней бесплатно
                    </Link>
                </div>
                
            </div>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
        
    )
}