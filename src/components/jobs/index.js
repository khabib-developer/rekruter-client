import React from "react";
import DateObject from "react-date-object";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Job } from "../Job";

export const Jobs = () => {
    const {jobs:{jobs1}, loading} = useSelector(s => s.app)
    const [jobData, setData] = React.useState(null)
    const navigate = useNavigate()
    const handleClick = e => {
        setData(e)
        navigate(`#job`)
    }
    if(loading) return (<div className="py-2 text-center text-muted">Loading...</div>)
    if(jobs1.length !== 0)
        return (
            <>
                {jobs1.map(e => <Job key={e.id} handleClick={handleClick} jobData={jobData} e={e} date={new DateObject(+e.date)} />)}
            </>
        )
    return (<h2 className="py-2 text-center">Poka tut nicego netu</h2>)
}