import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import { useAuth } from "./hooks/auth.hook";
import { Main } from "./pages/main";
import { Profile } from "./pages/profile/profile";
import { CreateResume } from "./pages/resume";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { hideLoader, setResume, setUpdateResume , setInfo} from "./redux/actions";
import { PageLoader } from "./components/pre-loader/PageLoader";
import { PublicViewEmployee } from "./pages/EmployeViewPofile";
import { ReferenceForm } from "./pages/Form";
import { usePosition } from "./hooks/state.hook";
import { useRefresh } from "./hooks/refresh.hook";
import {useProposal} from './hooks/proposal.hook'
import { Admin } from "./pages/Admin";
import { ExpiredPage } from "./pages/Error/expired";

export const Routess = () => {
    const {login, user, data, state, expired} = useSelector(state => state.app)
    const [permission, setPermission] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const {connect} = useRefresh()
    const {isUser} = useAuth()
    const {install} = usePosition()
    const {getBid} = useProposal()

    useEffect(() => {
        if(login) {
            (async function f() {
                const user = await isUser()
                await install()
                if(user) {
                    connect(user)
                    setPermission(true)
                    if(location.pathname === '/create-resume') 
                        dispatch(setResume(true))
                    else if(location.pathname === '/update-resume')
                        dispatch(setUpdateResume(true))
                }
            }())
        } else {
            setPermission(true)
            dispatch(hideLoader())
        }
    }, [login])

    useEffect(() => {
        if(login&&data&&data.state === state.proposal) {
            dispatch(setInfo('Уведомление'))
            getBid()
        }
    }, [data])


    if(permission) {
        return (
            <Routes>
                
                <Route path="/" element={<Main />} />
                {
                    login&&user?
                    <>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/lUNUMeWbbjO6c31kJBdJ2UDiBxh54blaAwsjpreC" element={<Admin />} />
                    </>
                    :
                    <>
                        <Route path="/auth" element={<SignUp />} />
                        <Route path="/login" element={<SignIn />} />
                    </>
                }
                {
                    user&&!user.resume&&user.type===1&&<Route path="/create-resume" element={<CreateResume />} />
                }
                {
                    user&&user.resume&&user.type===1&&<Route path="/update-resume" element={<CreateResume />} />
                }
                <Route path="user/:id" element={<PublicViewEmployee />} />

                <Route path="form/:token" element={<ReferenceForm />} />

                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        )
    }
    return <PageLoader />
    
}
