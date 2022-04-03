import React from "react"
import DateObject from "react-date-object"
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Job } from "../Job"
export const History = () => {
    const {jobs:{jobs3}} = useSelector(s => s.app)
    const [jobData, setData] = React.useState(null)
    const navigate = useNavigate()
    const handleClick = (e, text = '', bid = false) => {
        setData({...e, text, bid})
        navigate(`#job`)
    }
    
    if(jobs3.length === 0) 
        return <div className="text-center" >Nicego ne naydeno</div>
    return (
        <>
            {jobs3.map((e, i) => <Job e={e.vacancy} text={e.text} bid={true} jobData={jobData} handleClick={handleClick} date={new DateObject(+e.vacancy.date)} key={e.id} proposal={new DateObject(+e.date)} />)}
        </>
    )
}