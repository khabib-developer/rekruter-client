import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server';

import {styled} from '@mui/material/styles';
import { Avatar, Button, Checkbox, FormControlLabel, IconButton, NativeSelect, Paper, TextareaAutosize, TextField } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { regions } from "../../components/tabcontent/create-vacancy";
import { useSelector } from "react-redux";

import {useResume} from '../../hooks/resume.hooks'
import { ModelResume } from "../../components/Resume";
import { useNavigate } from "react-router-dom";

const Input = styled('input')({
    display: 'none',
});

export const status = ['Zanyotost Svoboden', 'Nemnogo zanyat', 'Vremenno ne rabotayu', 'Udalyonka']

export const CreateResume = () => {

    const {user, server} = useSelector(s => s.app)
    const [open,setOpen] = useState(false)

    const {create} = useResume()

    const navigate = useNavigate('')
    
    // main information
    const [surname, setSurname] = useState('')
    const [name, setName] = useState(user.name)
    const [lastname, setLastname] = useState('')
    const [profession, setProfession] = useState('')
    const [salary, setSalary] = useState('')
    const [busyness, setbusyness] = useState(user.status??0)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)

    // personal information
    const [location, setLocation] = useState(user.location||regions[0].label)
    const [moving, setMoving] = useState('Pereezd Vozmojen')
    const [citizenship, setcitizenship] = useState('')
    const [gender, setGender] = useState('Mujskoy')
    const [birthday, setBirthday] = useState(null)
    const [education, seteducation] = useState('')
    const [spouse, setspouse] = useState(false)
    const [childs, setChilds] = useState(false)

    //experience

    const exprObj = {
        settled:null,
        quit:null,
        vocation: profession,
        organization:'',
        full:false
    }

    const [experience, setExperience] = useState([exprObj])

    //education

    const eduObj = {
        institution:'',
        faculty:'',
        speciality: '',
        type:"Ochnaya",
        ending:''
    }

    const [edu, setEdu] = useState([eduObj])

    //course 

    const courseObj = {
        name:"",
        institution:"",
        ending:"",
        duration:"",
    }

    const [course, setCourse] = useState([])


    //computer languages

    const [languages, setLanguages] = useState('')
    const [computerSkills, setComputerSkills] = useState('')

    // dp

    const [army, setArmy] = useState(false)
    const [sanitary, setSanitary] = useState(false)
    const [rights, setRights] = useState({})

    const [freeTime, setFreeTime] = useState('')
    const [desc, setDesc] = useState('')

   const {ModelForView, ModelForPdf} = ModelResume({
        surname,
        name,
        lastname,
        profession,
        busyness,
        salary, 
        phone, 
        email,
        location, 
        moving, 
        citizenship,
        gender,
        birthday,
        education,
        spouse,
        childs,
        experience,
        edu,
        course,
        languages,
        computerSkills,
        army,
        sanitary,
        rights,
        freeTime,
        desc,
   })


    const handleResume = async () => {
        const htmlstring = ReactDOMServer.renderToString(ModelForPdf())
        await create({htmlstring})
        navigate('/profile')
    }

    return (
        <div className="d-flex flex-column align-items-center create-resume-wrapper">
            <h2 className="py-5">Resume Builder</h2>
            
            <Paper elevation={10} className="w-50 py-5 border-3">
                <h3 className="text-muted text-center">Osnovnaya informatsiya</h3>
                <div className="row mx-0 pt-3">
                    <div className="col-8 d-flex flex-column px-4">
                        <TextField size="small" value={surname} onInput={e => setSurname(e.target.value)} placeholder="Familiya" variant="standard" />
                        <TextField size="small" value={name} onInput={e => setName(e.target.value)} className="py-3" placeholder="Imya" variant="standard" />
                        <TextField size="small" value={lastname} onInput={e => setLastname(e.target.value)} placeholder="Otchestvo" variant="standard" />
                    </div>
                    <div className="col d-flex justify-content-center align-items-center" >
                        <Avatar sx={{width:'50%', height:"80%"}} src={user.photo&&`${server}static/images/`+user.photo}>
                            <label htmlFor="icon-button-file" className="">
                                <Input accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Avatar>
                        
                    </div>
                </div>  
                <div className="pt-4 px-4">
                    <div className="w-100">
                        <TextField size="small" value={profession} onInput={e => setProfession(e.target.value)} className="w-100" placeholder="Doljnost" variant="standard" />
                    </div>
                    
                    <div className="w-100 py-4 d-flex">
                        <TextField size="small" className="w-75" value={salary} onInput={e => setSalary(e.target.value)} placeholder="Jelayemaya zarplata" variant="standard" />
                        <NativeSelect
                            size="small"
                            value={busyness}
                            placeholder='zanyotost'
                            onChange={e => setbusyness(e.target.value)}
                            className="mx-2"
                            sx={{textAlign:'center'}}
                        >
                            {status.map((e, i) => (
                                <option value={i} key={i}>{e}</option>
                            ))}
                        </NativeSelect>
                    </div>
                    <div className="w-100 pt-4 d-flex">
                        <TextField size="small" className="w-50" value={phone} onInput={setPhone} placeholder="Telefon nomer" variant="standard" />
                        <TextField size="small" className="w-50" placeholder="email" value={email} onInput={e => setEmail(e.target.value)} variant="standard" />
                        
                    </div>
                </div>
            </Paper>

            <Paper elevation={10} className="w-50 py-5 my-5 border-3">
                <h3 className="text-muted text-center">Lichnaya inforamtsya</h3>
                
                <div className="pt-3 px-4">
                    
                    <div className="w-100 py-4 d-flex">
                        <NativeSelect
                            size="small"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="w-75"
                            sx={{textAlign:'center'}}
                        >
                            {regions.map((e, i) => (
                                <option key={i} value={e.label}>{e.label}</option>
                            ))}
                        </NativeSelect>
                        <NativeSelect
                            size="small"
                            value={moving}
                            onChange={e => setMoving(e.target.value)}
                            className="w-25"
                            sx={{textAlign:'center'}}
                        >
                            <option value={'Pereezd Vozmojen'}>Pereezd Vozmojen</option>
                            <option value={'Nevozmojen'}>Nevozmojen</option>
                            <option value={'Jelatelen'}>Jelatelen</option>
                            <option value={'Nejelatelen'}>Nejelatelen</option>
                        </NativeSelect>
                    </div>
                    <div className="w-100 pt-4 d-flex">
                        <TextField size="small" className="w-100" value={citizenship} onInput={e => setcitizenship(e.target.value)} placeholder="Grajdanstvo" variant="standard" />
                    </div>
                    <div className="w-100 pt-4 d-flex">
                        <NativeSelect
                            size="small"
                            className="w-50"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value={'Mujskoy'}>Mujskoy</option>
                            <option value={'Jenskiy'}>Jenskiy</option>
                        </NativeSelect>
                        
                        <div className="d-flex w-50 align-items-center">
                            <span className="text-muted px-3 pt-1">Data rojdenie:</span>
                            <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    // label="Data rojdenie"
                                    disableFuture
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    className="w-50 mx-3"
                                    value={birthday}
                                    onChange={(newValue, a) => {
                                        setBirthday(newValue)
                                    }}
                                    renderInput={(params) => <TextField variant="standard" {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        
                    </div>
                    <div className="w-100 pt-4 d-flex">
                        <span className="text-muted">Obrazavanie</span>
                        <NativeSelect
                            size="small"
                            className="w-50 mx-3"
                            value={education}
                            onChange = {e => seteducation(e.target.value)}
                        >
                            <option value={0}>Srednee</option>
                            <option value={1}>Srednee nepolnee</option>
                            <option value={2}>Srednee professoinalnie</option>
                            <option value={3}>Visshee</option>
                            <option value={4}>Vishsee nepolnee</option>
                        </NativeSelect>
                        
                    </div>

                    <div className="w-100 pt-2 d-flex">
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0"
                            label="Suprug"
                            onChange={e => setspouse(e.target.checked)}
                            checked={spouse}
                            labelPlacement="start"
                        />
                        
                    </div>
                    <div className="w-100 d-flex">
                        <FormControlLabel
                            className="mx-0"
                            value="start"
                            control={<Checkbox />}
                            label="Deti"
                            onChange={e => setChilds(e.target.checked)}
                            checked={childs}
                            labelPlacement="start"
                        />
                        
                    </div>
                </div>
            </Paper>

            <Paper elevation={10} className="w-50 py-5 border-3">
                <h3 className="text-muted text-center">Opit raboti</h3>


                 {experience.map((e,i) => (
                     <div key={i} className="pt-4 px-4">
                        <div className="w-100 pt-4 d-flex">
                            <div>
                                <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Ustroilsya"
                                        disableFuture
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        className="w-50 mx-3"
                                        value={e.settled}
                                        onChange={(newValue) => {
                                            setExperience(prev => [...prev.filter((el, j) => i!==j), {...e, settled:newValue}])
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="px-3">
                                <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Uvolilsya"
                                        disableFuture
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        className="w-50 mx-3"
                                        disabled={e.quit === 'now'}
                                        value={e.quit}
                                        onChange={(newValue) => {
                                            setExperience(prev => [...prev.filter((el, j) => i!==j), {...e, quit:newValue}])
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            
                            <FormControlLabel
                                className="mx-0"
                                value="start"
                                control={<Checkbox />}
                                checked={e.quit === 'now'}
                                onChange={(value) => {
                                    setExperience(prev => [...prev.filter((el, j) => i!==j), {...e, quit:value.target.checked?'now':null}])
                                }}
                                label="Nastayahsoe vremya"
                                labelPlacement="start"
                            />
                            
                        </div>
    
                        <div className="w-100 pt-4">
                            <TextField 
                            value={e.vocation}
                            onInput={(value) => {
                                setExperience(prev => [...prev.filter((el, j) => i!==j), {...e, vocation:value.target.value}])
                            }}
                            size="small" className="w-100" placeholder="Doljnost" variant="standard" />
                        </div>
    
                        <div className="w-100 pt-4">
                            <TextField 
                            value={e.organization}
                            onInput={(value) => {
                                setExperience(prev => [...prev.filter((el, j) => i!==j), {...e, organization:value.target.value}])
                            }}
                            size="small" className="w-100" placeholder="Organizatsiya" variant="standard" />
                        </div>
                    
                    
                        <div className="w-100 pt-4 d-flex justify-content-between">
                            <FormControlLabel
                                className="mx-0"
                                checked={e.full}
                                onChange={(value) => {
                                    setExperience(prev => [...prev.filter((el, j) => i!==j), {...e, full:value.target.checked}])
                                }}
                                value="start"
                                control={<Checkbox />}
                                label="Polnaya zanyatost"
                                labelPlacement="start"
                            />
                            <Button onClick={() => setExperience(prev => [...prev.filter((el, j) => i!== j) ])} className="text-danger">
                                <DeleteIcon />
                                
                            </Button>
                            
                        </div>
                        
                    </div>
                 ))}
                 <div className="w-100 pt-3 px-4 d-flex justify-content-between">
    
                    <Button className="text-secondary" onClick={() => setExperience(prev => [...prev, exprObj])} startIcon={<AddIcon />}>
                        Add item
                    </Button>
                    
                </div>
                
            </Paper>

            <Paper elevation={10} className="w-50 py-5 mt-5 border-3">
                <h3 className="text-muted text-center">Obrazavanie</h3>
                 
                 {edu.map((e,i) => (
                    <div key={i} className="pt-4 px-4">

                        <div className="w-100 pt-4">
                            <TextField
                            value={e.institution}
                            onInput={(value) => {
                                setEdu(prev => [...prev.filter((el, j) => i!==j), {...e, institution:value.target.value}])
                            }}
                            size="small" className="w-100" placeholder="Ucebnoe zvedenie" variant="standard" />
                        </div>
    
                        <div className="w-100 pt-4">
                            <TextField 
                            value={e.faculty}
                            onInput={(value) => {
                                setEdu(prev => [...prev.filter((el, j) => i!==j), {...e, faculty:value.target.value}])
                            }}
                            size="small" className="w-100" placeholder="Fakultet" variant="standard" />
                        </div>
    
                        <div className="w-100 pt-4">
                            <TextField
                            value={e.speciality}
                            onInput={(value) => {
                                setEdu(prev => [...prev.filter((el, j) => i!==j), {...e, speciality:value.target.value}])
                            }}
                             size="small" className="w-100" placeholder="Specialnost" variant="standard" />
                        </div>
                        
                        <div className="w-100 pt-4 d-flex justify-content-between align-items-end">
                            <NativeSelect
                                size="small"
                                className="p-0 w-50"
                                value={e.type}
                                onChange={(value) => {
                                    setEdu(prev => [...prev.filter((el, j) => i!==j), {...e, type:value.target.value}])
                                }}
                            >
                                <option value={'Ochnaya'}>Ochnaya</option>
                                <option value={'Ochno zaochnaya'}>Ochno zaochnaya</option>
                                <option value={'Zaochnaya'}>Zaochnaya</option>
                                <option value={'Distancionnaya'}>Distancionnaya</option>
                            </NativeSelect>
                            
                            <TextField 
                            value={e.ending}
                            onInput={(value) => {
                                setEdu(prev => [...prev.filter((el, j) => i!==j), {...e, ending:value.target.value}])
                            }}
                            size="small" className="" placeholder="God okanchania" variant="standard" />

                            <Button className="text-danger" onClick={() => setEdu(prev => [...prev.filter((el, j) => i!== j) ])}>
                                <DeleteIcon />
                                
                            </Button>
                            
                        </div>
                        
                    </div>
                 ))}
                 <div className="w-100 px-4 pt-3 d-flex justify-content-between">
                            
                    <Button className="text-secondary" onClick={() => setEdu(prev => [...prev, eduObj ])} startIcon={<AddIcon />}>
                        Add item
                        
                        
                    </Button>
                    
                </div>
                
            </Paper>
            <Paper elevation={10} className="w-50 py-5 mt-5 border-3">
                <h3 className="text-muted text-center">Курсы и тренинги</h3>

                {course.map((e,i) => (
                    <div key={i} className="pt-4 px-4">

                        <div className="w-100 pt-4">
                            <TextField
                            value={e.name}
                            onInput={(value) => {
                                setCourse(prev => [...prev.filter((el, j) => i!==j), {...e, name:value.target.value}])
                            }}
                            size="small" className="w-100" placeholder="Nazvanie kursa" variant="standard" />
                        </div>

                        <div className="w-100 pt-4">
                            <TextField 
                            value={e.institution}
                            onInput={(value) => {
                                setCourse(prev => [...prev.filter((el, j) => i!==j), {...e, institution:value.target.value}])
                            }}
                            size="small" className="w-100" placeholder="Ucebnoe zvedenie" variant="standard" />
                        </div>

                        
                        <div className="w-100 pt-4 d-flex justify-content-between align-items-end">
                            <div className="w-75">
                                <TextField
                                value={e.ending}
                                onInput={(value) => {
                                    setCourse(prev => [...prev.filter((el, j) => i!==j), {...e, ending:value.target.value}])
                                }}
                                size="small" className="w-50" placeholder="God okanchania" variant="standard" />
                                <TextField
                                value={e.duration}
                                onInput={(value) => {
                                    setCourse(prev => [...prev.filter((el, j) => i!==j), {...e, duration:value.target.value}])
                                }}
                                size="small" className="w-50" placeholder="Prodoljitelnost" variant="standard" />
                            </div>
                            
                            <Button className="text-danger" onClick={() => setCourse(prev => [...prev.filter((el, j) => i!== j) ])} >
                                <DeleteIcon />
                                
                            </Button>
                            
                        </div>
                        
                    </div>
                ))}
                <div className="w-100 px-4 pt-3 d-flex justify-content-between">
                            
                    <Button className="text-secondary" onClick={() => setCourse(prev => [...prev, courseObj ])} startIcon={<AddIcon />}>
                        Add item
                    </Button>
                    
                </div>
                 
                
            </Paper>

            <Paper elevation={10} className="w-50 py-5 mt-5 border-3">
                <h3 className="text-muted text-center">Иностранные языки и компьютерные навыки</h3>
                 
                <div className="pt-4 px-4">

                    <div className="w-100 pt-4">
                        <TextField size="small" value={languages} onInput={e => setLanguages(e.target.value)} className="w-100" placeholder="Kakie inostrannie yaziki vi znaete?" variant="standard" />
                    </div>

                    <div className="w-100 pt-4">
                        <TextField size="small" className="w-100" value={computerSkills} onInput={e => setComputerSkills(e.target.value)} placeholder="Compouter skills" variant="standard" />
                    </div>
                </div>
            </Paper>

            <Paper elevation={10} className="w-50 py-5 mt-5 border-3">
                <h3 className="text-muted text-center">Дополнительная информация</h3>
                 
                <div className="pt-4 px-4">

                    <div className="w-100 pt-3 d-flex flex-column">
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            checked={army}
                            onChange={e => setArmy(e.target.checked)}
                            className="mx-0 pt-2"
                            label="Slujba v armii"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            checked={sanitary}
                            onChange={e => setSanitary(e.target.checked)}
                            className="mx-0 pt-2"
                            label="Sanitarnaya knijka"
                            labelPlacement="end"
                        />
                    </div>
                    <div className="w-100 pt-4 d-flex flex-column">
                        Водительские права (категории):
                    </div>
                    <div className="w-100 pt-2 d-flex">
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0 pt-2"
                            checked={rights['A']}
                            onChange={e => setRights(prev => ({...prev, "A":true}))}
                            label="A"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0 pt-2"
                            checked={rights["B"]}
                            onChange={e => setRights(prev => ({...prev, "B":true}))}
                            label="B"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0 pt-2"
                            checked={rights["BE"]}
                            onChange={e => setRights(prev => ({...prev, "BE":true}))}
                            label="BE"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            checked={rights["C"]}
                            onChange={e => setRights(prev => ({...prev, "C":true}))}
                            className="mx-0 pt-2"
                            label="C"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            checked={rights["CE"]}
                            onChange={e => setRights(prev => ({...prev, "CE":true}))}
                            className="mx-0 pt-2"
                            label="CE"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            checked={rights["D"]}
                            onChange={e => setRights(prev => ({...prev, "D":true}))}
                            className="mx-0 pt-2"
                            label="D"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0 pt-2"
                            checked={rights["DE"]}
                            onChange={e => setRights(prev => ({...prev, "DE":true}))}
                            label="DE"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0 pt-2"
                            checked={rights["M"]}
                            onChange={e => setRights(prev => ({...prev, "M":true}))}
                            label="M"
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox />}
                            className="mx-0 pt-2"
                            checked={rights["TB и TM"]}
                            onChange={e => setRights(prev => ({...prev, "TB и TM":true}))}
                            label="TB и TM"
                            labelPlacement="end"
                        />
                    </div>

                    <div className="w-100 pt-4">
                        <TextareaAutosize
                            variant="filled"
                            aria-label="minimum height"
                            className="p-3 text-secondary"
                            value={freeTime}
                            onInput={e => setFreeTime(e.target.value)}
                            minRows={2}
                            placeholder="Vashi zanyatie v svobodnoe vremya"
                            style={{ width: '100%', border: 'none', outline:'none',backgroundColor:'rgba(0,0,0,0.06)', borderRadius:'6px' }}
                        />
                    </div>
                    <div className="w-100 pt-4">
                        <TextareaAutosize
                            variant="filled"
                            aria-label="minimum height"
                            className="p-3 text-secondary"
                            value={desc}
                            onInput={e => setDesc(e.target.value)}
                            minRows={2}
                            placeholder="Napishite o sebe"
                            style={{ width: '100%', border: 'none', outline:'none',backgroundColor:'rgba(0,0,0,0.06)', borderRadius:'6px' }}
                        />
                    </div>
                </div>
            </Paper>

            <div className="w-50 d-flex justify-content-end mt-3 mb-5">
                <Button className="bg-white px-5" style={{borderRadius:"30px",position:'fixed', bottom:'30px',right:"30px"}}>
                    <span className="text-gradient" onClick={() => setOpen(true)}>
                        Pereyti k prosmotr
                    </span>
                </Button>
            </div>

            <Dialog
             open={open}
             onClose={() => setOpen(false)}
             scroll='paper'
             fullWidth={true}
             maxWidth={'md'}
             aria-labelledby="scroll-dialog-title"
             aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent className="d-flex justify-content-center" dividers={true}>
                    {ModelForPdf()}    
                </DialogContent>
               
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleResume}>Soxranit</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}