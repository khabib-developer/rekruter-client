import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "./employee";
import { Employer } from "./employer";
import './style.css'


export const Profile = () => {
    const {user} = useSelector(s => s.app)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     if(user) {
    //         // dispatch(setPageLoader('hide'))
    //     }
    // }, [user, dispatch])
    if(user.type === 0)
        return <Employer />

    return <Employee />
}