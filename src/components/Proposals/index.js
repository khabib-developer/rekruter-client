import React, { useEffect } from "react";
import DateObject from "react-date-object";
import { useSelector } from "react-redux";
import { Proposal } from "./proposal";

export const Proposals = ({row, status, answer}) => {

    if(answer.filter(e => e.state === null).filter(e => e.status === status).length === 0)
        return <div className="text-center text-muted py-2">Нет потенциальных клиентов</div> 

    
    return (
        <div>
            {
                answer.filter(e => e.state === null).filter(e => e.status === status).map(e => (
                    <Proposal 
                        key={e.id} 
                        row={row} 
                        e={e} 
                        date1={e.data?new DateObject(+e.date):new DateObject(+e.date)} 
                        date2={e.data?null:new DateObject(+e.vacancy.date)} 
                        data={e.data? JSON.parse(e.data) :null}
                        structure={e.structure? JSON.parse(e.structure) :null}
                    />
                ))
            }
            
        </div>
    )
}