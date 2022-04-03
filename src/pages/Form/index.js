import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "../../hooks/form.hook";
import { styled } from '@mui/material/styles';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, ListItemText, MenuItem, NativeSelect, Radio, RadioGroup, Select, TextareaAutosize, TextField } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { fileTypes, MenuProps, types } from "../../components/tabcontent/form";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch, useSelector } from "react-redux";
import { setError, setWarning } from "../../redux/actions";
import { useFile } from "../../hooks/file.hook";
import { useAnswer } from "../../hooks/answer.hook";


const Input = styled('input')({display: 'none'});

export const ReferenceForm = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const {server} = useSelector(s => s.app)
    const {uploadFile} = useFile()
    const {create} = useAnswer()
    const params = useParams()
    const {getOne} = useForm()
    const [form, setForm] = useState(null)
    const [notFounded, setData] = useState(false)
    const [loaded, setloaded] = useState(false)
    const [error, seterror] = useState({})
    const [sended, setsended] = useState(false)

    const [answer, setanswer] = useState({
        name:'',
        phone:'',
        job:"",
        image:"",
    })

    useEffect(() => {
        (async function f() {
            const res = await getOne(params.token)
            if(res.notFounded) {
                setloaded(true)
                return setData(true)
            }
            setForm(res)
            JSON.parse(res.structure).forEach((item, i) => {
                setanswer(prev => ({...prev, [item.text]: item.type===types.checkbox?[]: item.type===types.radio?item.variant[0].text:'' }))
            })
            setanswer(prev => ({...prev, job: JSON.parse(res.jobs)[0] }))
            setloaded(true)
        })()
    }, [])

    const handleFile = async (event, folder, field) => {
        const formdata = new FormData()
        const file = event.target.files[0]
        formdata.append('file', file)
        const f = Object.keys(fileTypes)[Object.values(fileTypes).indexOf(folder)]
        const res = await uploadFile(formdata, `file/${f}`, 'answer')
        setanswer(prev => ({...prev, [field]: `${server}static/${f}/${res}`}))
    }

    const handleSend = async () => {
        const token = location.pathname.slice(6)
        seterror({})
        const err = {}
        let counter = 0
        for (const key in answer) {
            if(counter < 4) {
                if(answer[key] === '' || answer[key] === null || answer[key] === undefined) {
                    seterror(prev => ({...prev, [key]:true }))
                    err[key] = true
                }
            }
            counter++
        }

        JSON.parse(form.structure).forEach((item, i) => {
            if((answer[item.text] === '' || answer[item.text] === null || answer[item.text] === undefined || answer[item.text].length === 0) && item.required) {
                dispatch(setWarning(`${item.text} eto obyazatelnaya polya`))
                seterror(prev => ({...prev, [item.text]:true }))
                err[item.text] = true
            }
        })

        if( Object.keys(err).length === 0 ) {
            const res = await create({token, data: JSON.stringify(answer)})
            if(res) {
                setsended(true)
            }
        }
    }


    return (
        <div className="px-3" style={{minHeight:'100vh'}}>
            {
                !(notFounded||form)&&<div className="text-muted w-100 d-flex justify-content-center">Loading...</div>
            }
            {notFounded&&<div className="text-muted w-100 d-flex justify-content-center"> Форма не активна </div>}

            {form&&loaded&&
                <div className="py-3 px-4 w-100">
                    <div className="text-muted" style={{fontSize:"3rem"}}>
                        Форма
                    </div>
                    <div className="d-flex align-items-start py-2">
                        <label htmlFor="icon-button-file" style={{display:answer.image!==''?'none':null}}>
                            <Input  onChange={event => handleFile(event, fileTypes.images, 'image')} accept="image/*" id="icon-button-file" type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera /> 
                            </IconButton>
                            <span className="px-1" style={{color:error['image']?'red':''}}>Фото</span>
                        </label>
                        <div className="w-25 px-3" style={{display:answer.image===''?'none':null}}>
                            <img className="w-100" src={answer.image} alt="Vozmojno vi zagruzili kartinku ne pravilno" />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-start py-3">
                        <div className="d-flex w-100">
                            <TextField error={error.name} hiddenLabel value={answer.name} onInput={e => setanswer(prev => ({...prev, name: e.target.value}))} placeholder="Имя" id="standard-basic" className="w-100"  variant="standard" size="small" />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-start py-3">
                        <div className="d-flex w-100">
                            <TextField error={error.phone} hiddenLabel value={answer.phone} onInput={e => setanswer(prev => ({...prev, phone: e.target.value}))} placeholder="Телефон" id="standard-basic" className="w-100"  variant="standard" size="small" />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-start py-3">
                        <FormControl fullWidth>
                            <NativeSelect
                            value={answer.job}
                            onChange={e => setanswer(prev => ({...prev, job:e.target.value}))}
                            error={error.job} 
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            >
                                {JSON.parse(form.jobs).map(e => <option key={e} value={e}>{e}</option>)}
                            </NativeSelect>
                        </FormControl>
                    </div>

                    {
                        JSON.parse(form.structure).map((e,i) => {
                            switch(e.type) {
                                case types.text:
                                    return (
                                        <div key={i} className="d-flex flex-column justify-content-center align-items-start py-3">
                                            <div className="d-flex w-100">
                                                <TextField error={error[e.text]} hiddenLabel value={answer[e.text]} onInput={event => setanswer(prev => ({...prev, [e.text]: event.target.value })) } placeholder={e.text} required={e.required} id="standard-basic" className="w-100"  variant="standard" size="small" />
                                            </div>
                                        </div>
                                    )
                                case types.calendar:
                                    return (
                                        <div key={i} className="d-flex flex-column justify-content-center align-items-start py-3">
                                            <div className="d-flex w-100">
                                                <LocalizationProvider dateAdapter={AdapterDateFns} className="w-100">
                                                    <DatePicker
                                                        className="w-100"
                                                        label={e.text}
                                                        value={answer[e.text]}
                                                        error={error[e.text]}
                                                        onChange={(newValue) => {
                                                            setanswer(prev => ({...prev, [e.text]: newValue }))
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    )
                                case types.radio:
                                    return (
                                        <div key={i} className="d-flex flex-column justify-content-center align-items-start py-3">
                                            <div className="w-100">
                                                <div>{e.text}:</div>
                                                <FormControl fullWidth>
                                                    <NativeSelect
                                                    value={answer[e.text]}
                                                    onChange={event => setanswer(prev => ({...prev, [e.text]: event.target.value }))}
                                                    error={error.job}
                                                    >
                                                        {e.variant.map((item, j) => <option value={item.text} key={j}>{item.text}</option>)}
                                                    </NativeSelect>
                                                </FormControl>
                                            </div>
                                        </div>
                                    )
                                case types.checkbox:
                                    return (
                                        <div key={i} className="d-flex flex-column justify-content-center align-items-start py-3">
                                            <div className="w-100">
                                            <div>{e.text}:</div>
                                            <FormControl variant="standard" sx={{  width: '100%' }}>
                                                <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={answer[e.text]}
                                                onChange={event => {
                                                    const {target: { value } } = event
                                                    setanswer(prev => ({...prev, [e.text]:typeof value === 'string' ? value.split(',') : value }))
                                                }}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps} 
                                                >
                                                {e.variant.map((item, j) => (
                                                    <MenuItem key={j} value={item.text} >
                                                    <Checkbox checked={answer[e.text].indexOf(item.text) > -1} />
                                                        <ListItemText primary={item.text} />
                                                    </MenuItem>
                                                ))}
                                                </Select>
                                            </FormControl>
                                            
                                            </div>
                                        </div>
                                    )
                                case types.desc:
                                    return (
                                        <div key={i} className="d-flex flex-column justify-content-center align-items-start py-3">
                                            <div className="d-flex w-100">
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                minRows={3}
                                                error={error[e.text]}
                                                className="p-1 px-2"
                                                placeholder={e.text}
                                                style={{ width: "100%" }}
                                                value={answer[e.text]}
                                                onInput={event => {
                                                    setanswer(prev => ({...prev, [e.text]: event.target.value }))
                                                }}
                                                />
                                            </div>
                                        </div>
                                    )
                                case types.file:
                                    return (
                                        <div key={i} className="d-flex flex-column justify-content-center align-items-start py-3">
                                            <div className="d-flex w-100">
                                                <label htmlFor="contained-button-file">
                                                    <Input accept="" onChange={event => handleFile(event, fileTypes[e.file], e.text)} id="contained-button-file" multiple type="file" />
                                                    <Button variant="contained" component="span" style={{background:error[e.text]?'red':''}}>
                                                        {e.text}
                                                    </Button>
                                                </label>
                                                <div className="px-3" style={{display:answer[e.text]===''?'none':null}}> 
                                                    Загружено  
                                                </div>
                                            </div>
                                        </div>
                                    )
                                default:
                                    return null

                            }
                        })
                    }

                    <div className="d-flex flex-column justify-content-center align-items-start py-3">
                        <div className="d-flex w-100">
                            <Button className="bg-dark text-white px-4" disabled={sended} onClick={handleSend}>{sended?`Отправлено`:"Отправить"}</Button>
                        </div>
                    </div>

                </div>
            }
           
        </div>
    )
}