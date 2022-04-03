import React, { useEffect } from 'react';
import './sign-in.css'
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setPhone, clearForm } from '../redux/actions';
import { useAuth } from '../hooks/auth.hook';
const SignIn = () => {
    const dispatch = useDispatch()

    
    const {redirectToProfile} = useAuth()
    const loader = useSelector(state => state.app.loading)
    const inputPhone = useSelector(s => s.form.phone)
    const password = useSelector(s => s.form.password)
    const err = useSelector(s => s.form.error)

    useEffect(() => {
        return () => {
            dispatch(clearForm())
        }
    }, [dispatch])
   
    return (
        <>
            <div className="d-flex form-wrapper w-100 justify-content-center align-items-center">
                <div className='form-block d-flex justify-content-center mx-lg-0 mx-2'>
                    <form onSubmit={redirectToProfile} className="d-flex flex-column p-4 w-100">
                        <h1 className="text-center py-5">Log in</h1>
                        {err.auth?<span className='py-1 text-center' style={{color:'red'}}>{err.auth.message}</span>:null}
                        <TextField value={inputPhone} error={err.phone} onInput={e => dispatch(setPhone(e,err))} className="m-1" id="outlined-basic" label="Phone" variant="outlined" />
                        <TextField value={password} error={err.password} type="password" onInput={e => dispatch(setPassword(e.target.value))} className="m-1" id="outlined-basic" label="Password" variant="outlined" />
                        <Button className="m-1 py-2 mb-4 mt-3" type='submit' variant="contained">
                            {loader?'loading...':'Log in'}
                        </Button>
                        <div className='m-1 d-flex justify-content-end'>
                            <span>U tebya eshe net account?  <Link to="/auth">Registratsiya</Link></span>    
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn