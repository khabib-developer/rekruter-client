import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import {useSelector, useDispatch} from 'react-redux'
import React, { useEffect } from "react";
import { setError, setInfo, setSuccess, setWarning } from "../../redux/actions";
import { useTheme } from '@mui/material/styles';

export const SnackbarSuccess = () => {
    const {success} =useSelector(s => s.app)
    const dispatch = useDispatch()
    const handleClose = (event, reason) => {
        if(reason === 'clickaway')
            return
        dispatch(setSuccess(null))
    }
    return (
        <>
            <Snackbar open={!!success} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
        </>
    )
}

export const SnackbarWarning = () => {
    const {warning} = useSelector(s => s.app)
    const dispatch = useDispatch()
    const handleClose = (event, reason) => {
        if(reason === 'clickaway')
            return
        dispatch(setWarning(null))
    }
    return (
        <>
            <Snackbar open={!!warning} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {warning}
                </Alert>
            </Snackbar>
        </>
    )
}

export const SnackbarInfo = () => {
    const {info} = useSelector(s => s.app)
    const dispatch = useDispatch()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }

        if(info&&matches) {
            new Notification(info) 
        }
    }, [info]) 
    const handleClose = (event, reason) => {
        if(reason === 'clickaway')
            return
        dispatch(setInfo(null))
    }
    return (
        <>
            <Snackbar open={!!info} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {info}
                </Alert>
                
            </Snackbar>
        </>
    )
}

export const SnackbarError = () => {
    const {error} = useSelector(s => s.app)
    const dispatch = useDispatch()
    const handleClose = (event, reason) => {
        if(reason === 'clickaway')
            return
        dispatch(setError(null))
    }
    return (
        <>
            <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}