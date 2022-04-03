import React, {useEffect, useState} from "react";
import './sign-in.css'
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setName, setPassword, setPhone, setType, clearForm, setEmail, setSuccess } from "../redux/actions";
import { useAuth } from "../hooks/auth.hook";
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';


const SignUp = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(clearForm())
        }
    }, [dispatch])
    const name = useSelector(s => s.form.name)
    const phone = useSelector(s => s.form.phone)
    const email = useSelector(s => s.form.email)
    const password = useSelector(s => s.form.password)
    const type = useSelector(s => s.form.type)
    const err = useSelector(s => s.form.error)

    const [code, setCode] = useState('')
    const [activate, setActivate] = useState(false)
    const [afteractivate, setafteractivate] = useState(false)

    const {redirectToProfile, activateAction} = useAuth()

    const submitHandler = async (e) => {
        const data = await redirectToProfile(e, true)

        if(data) {
            setActivate(data.id)
            // dispatch(setSuccess("Kod otpravlen v vash email"))
        }
    }

    const activatehandler = async e => {
        e.preventDefault()
        const res = await activateAction({id:activate, code})
        if(res) {
            setafteractivate(true)
        }
    }

    const loader = useSelector(state => state.app.loading)
    return (
        <>
            <div className="d-flex form-wrapper w-100 justify-content-center align-items-center">
                <div className='form-block d-flex justify-content-center mx-lg-0 mx-2'>

                {   !activate?
                    <form onSubmit={submitHandler} className="d-flex flex-column p-4 w-100 bg-white">
                        <h1 className="text-center py-5">Create Account</h1>
                        <TextField value={name} required onInput={e => dispatch(setName(e.target.value))} className="m-1" id="outlined-basic" label="Name" variant="outlined" />
                        <TextField value={phone} required error={err.phone} onInput={e => dispatch(setPhone(e) )} className="m-1" id="outlined-basic" label="Phone" variant="outlined" />
                        <TextField value={email} type="email" required error={err.email} onInput={e => dispatch(setEmail(e.target.value) )} className="m-1" id="outlined-basic" label="Email" variant="outlined" />
                        <TextField value={password} type='password' error={err.password} onChange={e => dispatch( setPassword(e.target.value) ) } className="m-1" id="outlined-basic" label="Password" variant="outlined" />
                        <FormControl className="m-1">
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            required
                            varaint="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            value={type}
                            onChange={e => dispatch(setType(e.target.value))}
                            >
                            <MenuItem value={0}>Rabotadatel</MenuItem>
                            {/* <MenuItem value={1}>Rabotayushiy</MenuItem> */}
                            </Select>
                        </FormControl>

                        
                        <Button className="m-1 py-2 my-3"  variant="contained" type="submit">
                            {loader?'loading...':'Sign up'}
                        </Button>
                        
                        <div className='m-1 d-flex justify-content-end'>
                            <span>Uje est account?  <Link to="/login">Vxod</Link></span> 
                        </div>
                    </form>:
                    !afteractivate?

                    <form onSubmit={activatehandler} className="d-flex flex-column p-4 w-100 bg-white">
                        <h1 className="text-center py-5">Kod otpravlen v vash email</h1>
                        <TextField value={code} required onInput={e => setCode(e.target.value)} className="m-1" id="outlined-basic" label="Code" variant="outlined" />
                        
                        <Button className="m-1 py-2 my-3"  variant="contained" type="submit">
                            {loader?'loading...':'Send'}
                        </Button>
                        
                        <div className='m-1 d-flex justify-content-end'>
                            <span>Ne pravilniy email?  <Link to="#" onClick={() => setActivate(false)}>Da</Link></span> 
                        </div>
                    </form>:
                    <Paper className="p-5">
                        <span>
                        Вы успешно зарегистрировались, мы свяжемся с вами в ближайшее время
                        </span>
                    </Paper>
                    
                }

                </div>
            </div>
        </>
    )
}

export default SignUp