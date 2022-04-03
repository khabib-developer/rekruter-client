import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData, setExpired, setInfo, setLogin, setUserData } from '../redux/actions'

import { EventSourcePolyfill } from 'event-source-polyfill';
import { useNavigate } from 'react-router-dom';

export const useRefresh = () => {
    const {server, state} = useSelector(s => s.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const connect = useCallback((user) => {
        const sse = new EventSourcePolyfill(`${server}events/connect`, {
            headers: {
                "authorization":`Bearer ${localStorage.getItem('t')}`
            }
        })
        sse.onopen = (a) => {
            console.log('open')
        }
        sse.onmessage = e => {
            const data = JSON.parse(e.data)
            if(+user.id === +data.id) {
                dispatch(setData(data))

                switch(data.state) {
                    case "user":
                        dispatch(setInfo("Новый пользователь"))
                        break;
                    case "proposal":
                        dispatch(setInfo("Новый lid"))
                        break;
                    default:
                        break;
                }
            }
        }
        sse.onerror = async (err) => {
            if(err.status && err.status === 401) {
                let res = await fetch(`${server}auth/refresh`, {method:"GET",credentials:'include'})
                if(res.status === 401) {
                    dispatch(setUserData(null))
                    dispatch(setLogin(null))
                    await fetch(`${server}auth/logout`, {method:"GET",credentials:"include"})
                    navigate('/login')
                    return
                }
                res = await res.json()
                dispatch(setLogin(res.accessToken))
            }
            if(err.status === 403) {
                dispatch(setExpired(true))
                dispatch(setUserData(null))
                dispatch(setLogin(null))
                await fetch(`${server}auth/logout`, {method:"GET",credentials:"include"})
                // navigate('/login')
            }
            new Error(err)
        }
    }, [server])


    return {connect}
}