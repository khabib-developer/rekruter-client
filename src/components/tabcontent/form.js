import React, { useState } from "react";
import { Button, IconButton, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/form.hook";
import { setError } from "../../redux/actions";

const Input = styled('input')({display: 'none'});

export const types = {
    text:"text=",
    calendar:"calendar",
    desc:"desc",
    radio:"radio",
    checkbox:"checkbox",
    file:"file"
}

export const fileTypes = {
    resume:'Резюме',
    images:"Фото",
    video:"Видео"
}

export const vacancies = [
    'Smm',
    'Developer',
    'Teacher',
    'Pilot',
    'Targetolog',
    'Marketolog'
];

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};
  
function getStyles(name, vacancy, theme) {
    return {
      fontWeight:
        vacancy.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export const CreateReferenceForm = () => {

    const {createReference} = useForm()

    const dispatch = useDispatch()

    const [title, settitle] = useState('Название формы')

    const [anchorEl, setAnchorEl] = useState(null);
    const [field, setfield] = useState([])
    const [vacancy, setVacancy] = useState([])

    const theme = useTheme();

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setVacancy(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdd = type => {
        setfield(prev => [...prev, 
            {   id:prev.length,
                type, 
                required:false, 
                text:`Имя поля ${prev.length}`,
                variant:type===types.radio||type===types.checkbox?[
                    {text:'Ответ 1', id:0}, {text:'Ответ 2',id:1}
                ]:[],
                file:type===types.file? Object.keys(fileTypes)[Object.values(fileTypes).indexOf(fileTypes.resume )] : null
            }
        ])
        handleClose()
    }

    const handleCreate = async () => {
        if(vacancy.length === 0)
            return dispatch(setError("Выберите хотя бы одну вакансию"))
        if( title === "") 
            return dispatch(setError("Имя формы не может быть пустым"))
        
        const arr = []
        
        field.forEach((item, i) => {
            const index = field.filter((e, j) => i!==j).findIndex((e) => e.text === item.text)
            if(index !== -1)
                arr.push(index)
        })

        if(arr.length !== 0) {
            return dispatch(setError("Название формы не может совпадать"))
        }


        await createReference({
            jobs:JSON.stringify(vacancy),
            title,
            structure:JSON.stringify(field)
        })
    }

    
    return (
        <div className="p-lg-5 p-3">
            <div className="d-flex flex-column justify-content-center align-items-start py-3">
                <div className="d-flex w-100">
                    <TextField required hiddenLabel placeholder="Name" value={title} onInput={e => settitle(e.target.value)} id="standard-basic" className="w-100"  variant="standard" size="small" />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start py-1">
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera /> 
                    </IconButton>
                    <span className="px-1">Фото</span>
                </label>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start py-3">
                <div className="d-flex w-100">
                    <TextField hiddenLabel placeholder="Имя (Обязательное поле)" InputProps={{readOnly:true}} id="standard-basic" className="w-100"  variant="standard" size="small" />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start py-3">
                <div className="d-flex w-100">
                    <TextField hiddenLabel placeholder="Телефон (Обязательное поле)" InputProps={{readOnly:true}} id="standard-basic" className="w-100"  variant="standard" size="small" />
                </div>
            </div>
            <div className="d-flex flex-column w-100 justify-content-center align-items-start py-3">
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-chip-label" className="">Вакансия</InputLabel>
                    <Select
                        variant="standard"
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={vacancy}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                    MenuProps={MenuProps}
                    >
                    {vacancies.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, vacancy, theme)}
                        >
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            {
                field.map((item, i) => {

                    return (
                        <div className="py-3" key={i} >
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="d-flex w-75">
                                    <TextField hiddenLabel value={item.text} 
                                    onInput={(e) => {
                                        
                                        setfield(prev => {
                                            const index = prev.findIndex((element, idx) => element.id === i)
                                            prev[index].text = e.target.value
                                           return [ ...prev ]
                                        })} 
                                    } 
                                    id="standard-basic" placeholder="Name of field" className="w-100"  variant="standard" size="small" />
                                    {
                                        item.type===types.file&&
                                        <div className="px-4" style={{marginTop:"-3px"}}>
                                            <FormControl>
                                                <Select
                                                    variant="standard"
                                                    value={item.file}
                                                    onChange={(e) => {
                                                        setfield(prev => {
                                                            const index = prev.findIndex((element, idx) => element.id === i)
                                                            prev[index].file = e.target.value
                                                        return [ ...prev ]
                                                        }) 
                                                    }}
                                                >
                                                {
                                                    Object.values(fileTypes).map((e, i) => (
                                                        <MenuItem key={e} value={ Object.keys(fileTypes)[i] }>{e}</MenuItem>
                                                    ))
                                                }
                                                </Select>
                                            </FormControl>
                                        </div>
                                    }
                                    
                                </div>
                                <div className="d-flex">
                                    <Tooltip title="обязательный?">
                                        <Switch
                                            checked={item.required}
                                            onChange={() => 
                                                setfield(prev => {
                                                    const index = prev.findIndex((element, idx) => element.id === i)
                                                    prev[index].required = !prev[index].required
                                                    return [...prev ]
                                                }) 
                                            }
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <IconButton onClick={() => setfield(prev => [...prev.filter((e, j) => j!==i) ])}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>  
                            {
                                item.type===types.checkbox||item.type===types.radio?
                                <div>
                                    
                                    {item.variant.map((el, k) => {
                                        return (
                                                <div className="d-flex w-50 px-3" key={k} >
                                                    <TextField 
                                                        hiddenLabel 
                                                        value={el.text} 
                                                        onInput={
                                                            (e) => {
                                                                const index = item.variant.findIndex((element, idx) => element.id === k)
                                                                item.variant[index].text = e.target.value
                                                                setfield(prev => [
                                                                    ...prev.filter((e, j) => j!==i), 
                                                                    {...item, variant: item.variant }
                                                                    ]
                                                                )
                                                            } } 
                                                        id="standard-basic" placeholder="Name of field" className="w-50"  variant="standard" size="small" />
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => {
                                                                setfield(prev => [ ...prev.filter((e, j) => j!==i), {...item,variant:item.variant.filter((e,l) => l!==k), } ])
                                                            }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            )
                                    })}
                                    <Button onClick={
                                        () => {
                                            setfield(prev => [...prev.filter((e, j) => j!==i), {...item, variant: [ ...item.variant, {id:item.variant.length, text:'Ответ '+ +(item.variant.length+1)} ]  } ])
                                        }
                                    }><AddIcon /></Button>
                                    
                                </div>
                                :null
                            }
                        </div>
                        
                    )
                    
                })
            }

            <div className="py-2">
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <AddIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                    },
                    }}
                >
                    <MenuItem onClick={() => handleAdd(types.text)}>
                        Текстовое поле
                    </MenuItem>
                    <MenuItem onClick={() => handleAdd(types.calendar)}>
                        Календарь
                    </MenuItem>
                    <MenuItem onClick={() => handleAdd(types.desc)}>
                        Описание
                    </MenuItem>
                    <MenuItem onClick={() => handleAdd(types.radio)}>
                        Опрос 
                    </MenuItem>
                    <MenuItem onClick={() => handleAdd(types.checkbox)}>
                        Опрос с несколькими ответами
                    </MenuItem>
                    <MenuItem onClick={() => handleAdd(types.file)}>
                        Файл 
                    </MenuItem>
                    
                </Menu>
            </div>
            <div className="w-100 d-flex justify-content-end">
                <Button startIcon={<PublishIcon />} onClick={handleCreate} variant="text" className="text-secondary px-4">
                    Создать 
                </Button>
            </div>
        </div>
    )
}