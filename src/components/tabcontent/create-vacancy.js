import React, { useRef, useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemButton, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import PublishIcon from '@mui/icons-material/Publish';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from "@mui/system";
import { Editor } from '@tinymce/tinymce-react';
import { useVacancy } from "../../hooks/vacancy.hook";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../redux/actions";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: "95%",
    bgcolor: '#fff',
    border:'none !important',
    outline:"0",
    borderRadius:'6px',
    boxShadow: 24,
    p: 4,
};

export const regions = [
    {label: 'Tashkent'},
    {label: 'Buxara'},
    {label: 'Samarkand'},
    {label: 'Xorezm'},
]

const level = [
    {label:"Basic"},
    {label:"Conversational"},
    {label:"Fluent"},
    {label:"Native or Bilingual"},
]

const array = [
    {label:"Angliyskiy"},
    {label:"Russkiy"},
    {label:"Uzbek"},
    {label:"Tajik"},
    {label:"Kazakh"},
]

export const CreateVacancy = () => {

    const {server} = useSelector(s => s.app)

    const {create} = useVacancy()

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const [type, setRadio] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('<p>Eto opisanie</p>')

    const [skills, setSkills] = useState([])
    const [skill, setSkill] = useState('')

    const [currency, setCurrency] = useState('usd')
    const [salary, setSalary] = useState({from:'',to:''})
    const [place, setregion] = useState('')

    const [languages, setLanguages] = useState(array)
    const [language, setLanguage] = useState([])

    const [contact, setContact] = useState(1)

    const [publishModal, setPublish] = useState(false)

    const [error, setErr] = useState({})

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenPublish = () => setPublish(true);
    const handleClosePublish = () => setPublish(false);

    const verification = () => {
        if(type === '') {
            setErr(prev => ({...prev, type:1}))
            dispatch(setError('tip raboti obyazetelnoe polya'))
            return 
        }
        setErr({})
        if(title === ''){
            setErr(prev => ({...prev, title:1}))
            dispatch(setError('nazvanie raboti obyazetelnoe polya'))
            return 
        }
        setErr({})
        if(description === ''){
            setErr(prev => ({...prev, description:1}))
            dispatch(setError('opisanie obyazetelnoe polya'))
            return 
        }
        setErr({})
        if(salary.from === '' && salary.to === ''){
            setErr(prev => ({...prev, salary:1}))
            dispatch(setError('salary obyazetelnoe polya'))
            return 
        }
        setErr({})
        if(place === ''){
            setErr(prev => ({...prev, place:1}))
            dispatch(setError('place obyazetelnoe polya'))
            return 
        }
        setErr({})
        handleOpenPublish()
    }

    const actionPublish = async () => {
        const res = await create({
            type, 
            title, 
            description, 
            salary:JSON.stringify({...salary, currency, }), 
            place:place.label, 
            skills:skills.length!==0?JSON.stringify(skills):null, 
            language: language.length!==0?JSON.stringify(language):null,
            contact
        })
        if(res) {
            dispatch(setSuccess('Vacancy uspeshno sozdan'))
            setRadio('')
            setTitle('')
            setDesc('')
            setSkills([])
            setSalary({from:'',to:''})
            setregion('')
            setLanguage([])
            handleClosePublish()
        } else {
            handleClosePublish()
        }
    }

    const addSkill = () => {
        if(skill !== '') {
            setSkills(prev => [...prev, skill])
            setSkill('')
        }
    }

    const addLanguageItem = () => {
        setLanguage(prev => [...prev, {language:languages[0].label, level:level[0].label} ])
        setLanguages(prev => prev.filter((e, i) => i !== 0))
    }
    const changeLanguageItem = async (newVal, i) => {

        const newValue = newVal || {label:''}

        setLanguage(prev => {
            const newArr = [...prev.filter((e, j) => i !== j), {language:newValue.label, level:language[i].level}]
            const arr = [...array]

            newArr.forEach(e1 => {
                arr.forEach((e2, i) => {
                    if(e1.language === e2.label) {
                        arr.splice(i, 1)
                    }
                })
            })

            setLanguages(arr)
            return newArr
        } )
    }

    const editorRef = useRef(null)

    // return (
    //     <div className="w-100 d-flex flex-column justify-content-center align-items-center h-100">
    //         {/* <div className="w-100" style={{background:"rgba(0,0,0,0.3)"}}>
    //             <img className="" style={{width:"90%"}} src={`${server}static/image/blur.png`} alt="blur" />
    //         </div> */}
    //         <LockIcon className="text-danger" />
    //         <div className="text-danger">
    //             Для вас заблокирован этот раздел 
    //         </div>
    //     </div>
    // )

    return (
        <div className="py-5 px-lg-5 px-2 px-lg-1">
            <div className="d-flex flex-column justify-content-center align-items-start py-3 ">
                <Typography className="pb-2 text-secondary">Tip raboti (required)</Typography>
                <div className="d-flex w-100" onClick={handleOpen}>
                    <TextField 
                    hiddenLabel 
                    error={error.type} 
                    InputProps={{readOnly:true}} 
                    onInput={e => setRadio(e.target.value)} 
                    value={type} id="standard-basic" className="w-100"  variant="filled" size="small" />
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{...style, width:matches?"80%":"95%"}}>
                        <Typography id="modal-modal-title" variant="h6" className="text-secondary w-100" component="h2">
                            Tip raboti 
                        </Typography>
                        <div className="accordion-radio">
                            <FormControl component="fieldset" className="w-100">
                                <RadioGroup value={type} onChange={e => setRadio(e.target.value) } >
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Marketing</Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <div>
                                                <FormControlLabel value="SMM" label="SMM" control={<Radio />} />
                                            </div>
                                            <div>
                                                <FormControlLabel value="Market Research Analyst" label="Market Research Analyst" control={<Radio />} />
                                            </div>
                                            
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Developer</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                <FormControlLabel value="Frontend" label="Frontend" control={<Radio />} />
                                            </div>
                                            <div>
                                                <FormControlLabel value="Backend" label="Backend" control={<Radio />} />
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </RadioGroup>
                            </FormControl>
                            
                        </div>
                    </Box>
                </Modal>
            </div>
            <div className="d-flex flex-column justify-content-start py-3">
                <div className="pb-3">
                    <Typography className="text-secondary">Nazvanie raboti (required)</Typography>
                </div>
                <TextField hiddenLabel error={error.title} value={title} onInput={e => setTitle(e.target.value)} required id="standard-basic" className="w-100"  variant="filled" size="small" />
            </div>
            <div className="d-flex flex-column justify-content-start py-3">
                <div className="">
                    <Typography className="text-secondary">Opisanie (required)</Typography>
                </div>
                <div style={{border:!error.description||"1px solid red"}} className="pt-3 w-100">
                    <Editor
                        className="py-3"
                        apiKey="tyadhszjzurqfse89iedirla6hy7v12swy0npw2vhxp0i6c8"
                        onInit={(evt, editor) => editorRef.current = editor}
                        value={description}
                        onEditorChange={(newValue, editor) => setDesc(newValue)}

                        initialValue='<p>Eto ne privichka eto v moem dnk</p>'
                        init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                
                <div className="d-flex flex-column justify-content-start py-3">
                    <div className="pb-3 d-flex align-items-center">
                        <Typography className="text-secondary">Predpologayamiy uroven doxoda (required)</Typography>
                        <FormControl  size="small" variant="filled" hiddenLabel className="mx-lg-4 mx-0">
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={currency}
                                onChange={e => setCurrency(e.target.value)}
                            >
                            <MenuItem value={'sum'}>Sum</MenuItem>
                            <MenuItem value={'usd'}>USD</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                    <div className="w-100">
                        <TextField hiddenLabel error={error.salary} type="number" value={salary.from} required placeholder="ot" onInput={(e) => setSalary(prev => ({...prev, from:e.target.value}))} id="standard-basic" className="w-50"  variant="filled" size="small" />
                        <TextField hiddenLabel error={error.salary} type="number" value={salary.to} required placeholder="do" id="standard-basic" onInput={(e) => setSalary(prev => ({...prev, to:e.target.value}))} className="w-50"  variant="filled" size="small" />
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-start py-3">
                    <div className="pb-3">
                        <Typography className="text-secondary">Mesto raboti (required)</Typography>
                    </div>
                    <Autocomplete
                        size="small"
                        className="w-100"
                        // disablePortal
                        id="combo-box-demo"
                        options={regions}
                        // inputValue={place}
                        value={place}
                        onChange={(e, n) => setregion(n)}
                        // onInputChange={(e, n) => setregion(n)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField error={error.place} size="small" variant="filled" {...params} hiddenLabel />}
                    />
                </div>

                <div className="d-flex flex-column justify-content-start py-2 mt-3">
                    <Typography className="text-secondary ">Naviki (optional)</Typography>
                    <div className="py-2 w-100">
                        <List>
                            {skills.map((e, i) => (
                                <ListItem key={i} disablePadding className="bg-light">
                                    <ListItemButton className="d-flex justify-content-between">
                                    <span>{e}</span>
                                    <span onClick={() => setSkills(prev=> [...prev.filter((item, j) => i!==j)])} className="text-danger"><DeleteIcon /></span>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            
                        </List>
                    </div>

                    <div className="w-100 d-flex">
                        <TextField
                            hiddenLabel
                            value={skill}
                            onInput={e => setSkill(e.target.value)}
                            className="w-75"
                            id="filled-hidden-label-small"
                            placeholder="Napishite navik"
                            variant="filled"
                            size="small"
                            onKeyPress={e => {
                                if(e.key === 'Enter') {
                                    addSkill()
                                }
                            }}
                        />
                        <div variant="text" className="btn" onClick={addSkill}> <CreateIcon /> <span className="px-lg-2 px-0">Add</span></div>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-start py-3">
                    <div className="pb-3">
                        <Typography className="text-secondary">Language (optional)</Typography>
                    </div>
                    {language.map((e, i) => (
                        <div className="w-75 d-flex py-1" key={i}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                value={e.language}
                                onChange={(val, newValue) => changeLanguageItem(newValue, i)}
                                id="combo-box-demo"
                                options={languages}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField onInput={(e) => console.log(e.target.value)} {...params} hiddenLabel variant="filled" size="small" placeholder="language" />}
                            />
                            <Autocomplete
                                size="small"
                                disablePortal
                                value={e.level}
                                onChange={(val, newValue) => {
                                    const v = newValue || {label:''}
                                    console.log(v)
                                    setLanguage(prev => [...prev.filter((el, j) => i !== j), {language:e.language, level:v.label}])
                                } }
                                id="combo-box-demo"
                                options={level}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField variant="filled" hiddenLabel size="small" {...params} placeholder="uroven" />}
                            />
                            <Button variant="filled" 
                                onClick={() => {
                                    setLanguage(prev => [...prev.filter((el, j) => i !== j)] )
                                    setLanguages( prev => [...prev, {label:e.language} ] )
                                }} 
                                className="text-danger">
                                <DeleteIcon />
                            </Button>
                        </div>
                    ))}
                    
                    {language.length < array.length?
                        <div className="text-secondary py-2 btn d-flex justify-content-start px-0 btn"  onClick={addLanguageItem}>
                            <CreateIcon />
                            <span className="px-2">Add Item</span>
                        </div>:null
                    }
                    <div className="d-flex flex-column justify-content-start py-3">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Contact info (optinal)</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                value={contact}
                                onChange={e => setContact(e.target.value)}
                                name="controlled-radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Hide" />
                                <FormControlLabel value="0" control={<Radio />} label="Show" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className="w-100 d-flex justify-content-end">
                        <Modal
                            open={publishModal}
                            onClose={handleClosePublish}
                            aria-labelledby="modal-modal-title-publish"
                            aria-describedby="modal-modal-description-publish"
                        >
                            <Box sx={{...style, width: '400px'}}>
                                <Typography id="modal-modal-title-publish" variant="h6" className="text-secondary" component="h2">
                                    r u sure?
                                </Typography>
                                <div className="d-flex justify-content-end">
                                    <ButtonGroup variant="text" aria-label="text button group">
                                        <Button className="text-secondary" onClick={actionPublish}>Yes</Button>
                                        <Button className="text-secondary" onClick={handleClosePublish}>No</Button>
                                    </ButtonGroup>
                                </div>
                                
                            </Box>

                        </Modal>
                        <Button startIcon={<PublishIcon />} onClick={verification} variant="text" className="text-secondary px-4">
                            Publish
                        </Button>
                    </div>
                    
                </div>
                    
            </div>
        </div>
    )
}