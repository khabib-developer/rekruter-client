import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Markup } from "interweave";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setDrawer } from "../../redux/actions";

export const Job = ({e, date, proposal, jobData, bid, text, handleClick}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [history, setHistory] = useState(false)

    useEffect(() => {
        if(location.hash === '#job') {
            dispatch(setDrawer(jobData))
            setHistory(true)
        }
        if(history) {
            dispatch(setDrawer(false))
            setHistory(false)
        }
    }, [location])

    
    return (
        <Card onClick={() => handleClick(e, text, bid)} key={e.id} sx={{borderRadius:0}} className="mt-1">
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" className="text-success" component="div">
                        {e.title} - {e.type}
                    </Typography>
                    <Markup content={e.description} />

                    <Typography variant="body2" color="text.secondary" > 
                        Mestopolojenie: {e.place}, Zarplata: {JSON.parse(e.salary).from} - {JSON.parse(e.salary).to} {JSON.parse(e.salary).currency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" > 
                        Data publikatsii: {date.format("YYYY/MM/DD hh:mm")}
                    </Typography>
                    {proposal&&
                        <Typography variant="body2" color="text.secondary" > 
                            Data otklika: {proposal.format("YYYY/MM/DD hh:mm")}
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
}