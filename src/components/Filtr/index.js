import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuProps, vacancies } from "../tabcontent/form";
import { Checkbox, ListItemText, MenuItem, OutlinedInput, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProposal } from "../../redux/actions";

export const columnnames = [
    "НЕРАЗОБРАННОЕ","ПЕРВИЧНЫЙ КОНТАКТ","ПЕРЕГОВОРЫ","СОГЛАСОВАНИЕ ДОГОВОРА"
]

const archiveType = {
    'Успешно завершено':"success",
    'Избранное':"selected",
    'Отказ':"fail"
}


const fromType = [
    "Реферальная ссылка",
    "Вакансия"
]

export const Filtr = () => {

    const dispatch = useDispatch()

    const {form} = useSelector(s => s.app)
    
    const {stockProposals} = useSelector(s => s.ui)

    const [column, setcolumn] = useState(columnnames);

    const [forms, setforms] = useState(form.map(e => e.title))

    const [jobs, setvacancies] = useState(stockProposals.filter(e => e.vacancy_id).map(e => e.vacancy.title))

    const [vacancies2, setvacancies2] = useState(vacancies)

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setcolumn(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange2 = (event) => {
        const {
        target: { value },
        } = event;
        setforms(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange3 = (event) => {
        const {
        target: { value },
        } = event;
        setvacancies(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange4 = (event) => {
        const {
        target: { value },
        } = event;
        setvacancies2(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [phone, setphone] = useState('')

    useEffect(() => {
        if(stockProposals.length !== 0 && form.length !== 0) {
            let arr = [], arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = []

            column.forEach((item,i) => {
                stockProposals.filter(e => e.state === null).forEach((e,j) => {
                    if(columnnames.indexOf(item) === e.status){
                        arr.push(e)
                    }
                })
            })

            if(forms.length !== 0) {
                forms.forEach((item, i) => {
                    arr1.push(arr.filter(e => !e.vacancy_id).filter(e => item === e.name_of_form))
                })
    
                arr1.forEach(element => {
                    element.forEach(e => {
                        arr2.push(e)
                    })
                });
    
                arr2 = arr2.concat(arr.filter(e => e.vacancy_id))
    
                jobs.forEach((item, i) => {
                    arr3.push(arr2.filter(e => e.vacancy_id).filter(e => item === e.vacancy.title))
                })
    
    
                arr3.forEach(element => {
                    element.forEach(e => {
                        arr4.push(e)
                    })
                });
    
    
                arr4 = arr4.concat(arr2.filter(e => !e.vacancy_id))
    
                vacancies2.forEach((item, i) => {
                    arr5.push(arr4.filter(e => !e.vacancy_id).filter(e => item === JSON.parse(e.data).job ))
                })
    
            
    
                arr5.forEach(element => {
                    element.forEach(e => {
                        arr6.push(e)
                    })
                });
    
                if(vacancies.length === vacancies2.length) {
                    arr6 = arr6.concat(arr4.filter(e => e.vacancy_id))
                }
    
                arr7 = arr6.filter(e => JSON.parse(e.data).phone.indexOf(phone) !== -1)
    
                if(phone === '') {
                    arr7 = arr6
                }
                dispatch(setProposal( arr7 ) )
            }
        }
        
    }, [column, forms, vacancies2, phone, stockProposals, dispatch])

    return (
        <div className="d-flex">
            <div>
                <FormControl variant="standard" sx={{  width: 150 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={column}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {columnnames.map((name) => (
                        <MenuItem key={name} value={name} style={{fontSize:".8rem"}} >
                        <Checkbox checked={column.indexOf(name) > -1} />
                        <ListItemText primary={name} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div className="px-4">
                <FormControl variant="standard" sx={{  width: 150 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={forms}
                    onChange={handleChange2}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {form.map((e) => (
                        <MenuItem key={e.id} value={e.title} style={{fontSize:".8rem"}} >
                        <Checkbox checked={forms.indexOf(e.title) > -1} />
                        <ListItemText primary={e.title} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            {/* <div className="">
                <FormControl variant="standard" sx={{  width: 150 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={jobs}
                    onChange={handleChange3}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {stockProposals.filter(e => e.vacancy_id).map((e) => (
                        <MenuItem key={e.id} value={e.vacancy.title} style={{fontSize:".8rem"}} >
                        <Checkbox checked={jobs.indexOf(e.vacancy.title) > -1} />
                        <ListItemText primary={e.vacancy.title} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div> */}
            <div className="px-4">
                <FormControl variant="standard" sx={{  width: 150 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={vacancies2}
                    onChange={handleChange4}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {vacancies.map((e, i) => (
                        <MenuItem key={i} value={e} style={{fontSize:".8rem"}} >
                        <Checkbox checked={vacancies2.indexOf(e) > -1} />
                        <ListItemText primary={e} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div className="" style={{marginTop:"-5px"}}>
                <TextField value={phone} onInput={e => setphone(e.target.value)} id="standard-basic" placeholder="phone" style={{fontSize:".8rem"}} variant="standard" />
            </div>
        </div>
    )
}

export const ArchiveFIlter = ({setrows}) => {


    const {form} = useSelector(s => s.app)

    const {stockProposals} = useSelector(s => s.ui)

    const [archive, setarchive] = useState(Object.keys(archiveType));

    const [forms, setforms] = useState(form.map(e => e.title))

    const [jobs, setvacancies] = useState(stockProposals.filter(e => e.vacancy_id).map(e => e.vacancy.title))

    const [vacancies2, setvacancies2] = useState(vacancies)


    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setarchive(
        typeof value === 'string' ? value.split(',') : value,
        );
    };


    const handleChange3 = (event) => {
        const {
        target: { value },
        } = event;
        setforms(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange4 = (event) => {
        const {
        target: { value },
        } = event;
        setvacancies(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange5 = (event) => {
        const {
        target: { value },
        } = event;
        setvacancies2(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [phone, setphone] = useState('')

    useEffect(() => {
        let arr = [], arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = []

        archive.forEach((item,i) => {
            stockProposals.filter(e => e.state !== null).forEach((e,j) => {
                if(archiveType[item] === e.state){
                    arr.push(e)
                }
            })
        })

        forms.forEach((item, i) => {
            arr1.push(arr.filter(e => !e.vacancy_id).filter(e => item === e.name_of_form))
        })

        arr1.forEach(element => {
            element.forEach(e => {
                arr2.push(e)
            })
        });

        arr2 = arr2.concat(arr.filter(e => e.vacancy_id))

        jobs.forEach((item, i) => {
            arr3.push(arr2.filter(e => e.vacancy_id).filter(e => item === e.vacancy.title))
        })


        arr3.forEach(element => {
            element.forEach(e => {
                arr4.push(e)
            })
        });


        arr4 = arr4.concat(arr2.filter(e => !e.vacancy_id))

        vacancies2.forEach((item, i) => {
            arr5.push(arr4.filter(e => !e.vacancy_id).filter(e => item === JSON.parse(e.data).job ))
        })

       

        arr5.forEach(element => {
            element.forEach(e => {
                arr6.push(e)
            })
        });

        if(vacancies.length === vacancies2.length) {
            arr6 = arr6.concat(arr4.filter(e => e.vacancy_id))
        }

        arr7 = arr6.filter(e => !e.vacancy_id).filter(e => JSON.parse(e.data).phone.indexOf(phone) !== -1)

        if(phone === '') {
            arr7 = arr6
        }


        setrows(arr7)

    }, [archive, forms, jobs, phone, setrows, stockProposals, vacancies2] )

    return (
        <div className="py-2 px-3 d-flex" style={{overflow:'scroll'}}>
            <div>
                Фильтр:
            </div>
            <div className="px-3 mx-1">
                <FormControl variant="standard" sx={{  width: 100 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={archive}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {Object.keys(archiveType).map((name) => (
                        <MenuItem key={name} value={name} style={{fontSize:".8rem"}} >
                        <Checkbox checked={archive.indexOf(name) > -1} />
                        <ListItemText primary={name} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div className="">
                <FormControl variant="standard" sx={{  width: 100 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={forms}
                    onChange={handleChange3}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {form.map(e => e.title).map((name) => (
                        <MenuItem key={name} value={name} style={{fontSize:".8rem"}} >
                        <Checkbox checked={forms.indexOf(name) > -1} />
                        <ListItemText primary={name} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div className="px-4">
                <FormControl variant="standard" sx={{  width: 100 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={jobs}
                    onChange={handleChange4}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {stockProposals.filter(e => e.vacancy_id).map(e => e.vacancy.title).map((name) => (
                        <MenuItem key={name} value={name} style={{fontSize:".8rem"}} >
                        <Checkbox checked={jobs.indexOf(name) > -1} />
                        <ListItemText primary={name} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div className="">
                <FormControl variant="standard" sx={{  width: 100 }}>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    style={{fontSize:".8rem"}}
                    className="text-muted"
                    value={vacancies2}
                    onChange={handleChange5}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps} 
                    >
                    {vacancies.map((name) => (
                        <MenuItem key={name} value={name} style={{fontSize:".8rem"}} >
                        <Checkbox checked={vacancies2.indexOf(name) > -1} />
                        <ListItemText primary={name} className="text-muted" style={{fontSize:".8rem"}} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div className="px-4" style={{marginTop:"-5px"}}>
                <TextField value={phone} onInput={e => setphone(e.target.value)} id="standard-basic" placeholder="phone" style={{fontSize:".8rem"}} variant="standard" />
            </div>

        </div>
    )
}