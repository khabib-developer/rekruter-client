import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InfoIcon from '@mui/icons-material/Info';
import { status } from "../../pages/resume";

export const ModelResume = ({
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
}) => {
    const {user, server} = useSelector(s => s.app)
    const stringFilter = string => string===""?<span className="bg-warning px-2 mx-2">Ne ukazano</span>:string
    const ModelForView =  () => (
        <div className="" style={{display:'flex'}}>
            <div className="col-8 p-0">
                <div className="row m-0 p-0">
                    <div className="col-3 p-0">
                        <Avatar sx={{width:'100%', height:"100%"}} src={user.photo&&`${server}static/images/`+user.photo}>
                            default
                        </Avatar>
                    </div>
                    <div className="col d-flex flex-column justify-content-between">
                        <div>
                            <h5>{surname} {name} {lastname}</h5>
                            <div>{stringFilter(profession)}</div>
                        </div>
                        <div>
                            <LocationOnIcon /> {location}, {moving}
                        </div>
                    </div>
                </div>
                <div className="pt-3 pb-4">
                    <div className="pb-3 px-1">
                        <AccountCircleIcon /> <b>Lichnaya informatsiya</b>
                    </div>
                    <div className="px-3 mx-3" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                        <div className="d-flex">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Grajdanstvo:
                            </Typography>
                            <Typography variant="body2" className="" color="text.black" > 
                                {stringFilter(citizenship)}
                            </Typography>
                        </div>
                        <div className="d-flex">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Obrazavanie:
                            </Typography>
                            <Typography variant="body2" className="" color="text.black" > 
                                {stringFilter(education)}
                            </Typography>
                        </div>
                        <div className="d-flex">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Data rojdenie:
                            </Typography>
                            <Typography variant="body2" className="" color="text.black" > 
                                {stringFilter(birthday?birthday.toString().slice(0, 16):'')}
                            </Typography>
                        </div>
                        <div className="d-flex">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Pol:
                            </Typography>
                            <Typography variant="body2" className="" color="text.black" > 
                                {gender}
                            </Typography>
                        </div>
                        <div className="d-flex">
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Semeynie polojenie:
                            </Typography>
                            <Typography variant="body2" className="" color="text.black" > 
                                {spouse?"est semya":"net semi"}, {childs?"est deti":"net deti"}
                            </Typography>
                        </div>
                        
                    </div>
                    {
                        experience.length!==0&&
                        <>
                            <div className="py-3 px-1">
                                <WorkIcon /> <b>Opit raboti</b>
                            </div>
                            {experience.map((e, i) => (
                                <div key={i} className="px-2 mx-3" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.vocation)}
                                        </Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.organization)}
                                        </Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.settled?e.settled.toString().slice(0,16):'')} - {stringFilter(e.quit?e.quit.toString().slice(0,16):'')} {e.full}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    }
                    {
                        edu.length!==0&&
                        <>
                            <div className="py-3 px-1">
                                <SchoolIcon /> <b>Obrazavanie</b>

                            </div>
                            {edu.map((e, i) => (
                                <div key={i} className="px-2 mx-3" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.institution)}
                                        </Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.faculty)} ({stringFilter(e.speciality)})
                                        </Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.ending)} - {e.type}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    }
                    {
                        course.length!==0&&
                        <>
                        
                            <div className="py-3 px-1">
                                <AutoStoriesIcon /> <b>Kursi i treninggi</b>

                            </div>
                            {course.map((e, i) => (
                                <div key={i} className="px-2 mx-3" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.name)}
                                        </Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.institution)}
                                        </Typography>
                                    </div>
                                    <div className="d-flex">
                                        <Typography variant="body2" className="" color="text.secondary" > 
                                            {stringFilter(e.ending)} - {stringFilter(e.duration)}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    }
                    <div className="py-3 px-1">
                        <InfoIcon /> <b>Dopolnitelnaa informatsiya</b>

                    </div>
                    <div className="px-2 mx-3" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                        <div className="d-flex flex-column">
                            {army&&
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Slujba v armii
                            </Typography>
                            }
                            {sanitary&&
                            <Typography variant="body2" className="" color="text.secondary" > 
                                Sanitarnaya knijka
                            </Typography>
                            }
                            {Object.keys(rights).length!==0?
                            <div className="d-flex">
                                <Typography variant="body2" className="" color="text.black" > 
                                    Voditelskaya prava:
                                </Typography>
                                <Typography variant="body2" className=" px-1" color="text.secondary" > 
                                    {Object.keys(rights).map(e => e).join(', ')}
                                </Typography>
                            </div> :
                            <Typography variant="body2" className="" color="text.secondary" > 
                                {stringFilter('')}
                            </Typography>
                            
                            }
                            {freeTime!==''&&
                            <div className="d-flex flex-column">
                                <Typography variant="body2" className="" color="text.black" > 
                                    Zanyatie na svobodnoe vremya:
                                </Typography>
                                <Typography variant="body2" className="" color="text.secondary" > 
                                    {freeTime}
                                </Typography>
                            </div>
                            
                            }
                            {desc!==''&&
                            <div className="d-flex flex-column">
                                <Typography variant="body2" className="" color="text.black" > 
                                    O sebe:
                                </Typography>
                                <Typography variant="body2" className="" color="text.secondary" > 
                                    {desc}
                                </Typography>
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4 px-0 mx-0">
                <div className="px-3" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                    <div className="d-flex">
                        <Typography variant="body1" className="" color="text.black" > 
                            Jelayemaya zarplata
                        </Typography>
                    </div>
                    <div className="d-flex py-1">
                        <Typography variant="body2" className="" color="text.secondary" > 
                            {stringFilter(salary)}
                        </Typography>
                    </div>
                    <div className="d-flex">
                        <Typography variant="body2" className="" color="text.secondary" > 
                            {status[busyness]}
                        </Typography>
                    </div>
                </div>
                <div className="px-3 my-2" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                    <div className="d-flex">
                        <Typography variant="body1" className="" color="text.black" > 
                            Kontakti
                        </Typography>
                    </div>
                    <div className="d-flex py-1">
                        <Typography variant="body2" className="" color="text.secondary" > 
                            {stringFilter(phone)}
                        </Typography>
                    </div>
                    <div className="d-flex">
                        <Typography variant="body2" className="" color="text.secondary" > 
                            {stringFilter(email)}
                        </Typography>
                    </div>
                </div>
                <div className="px-3 mt-5" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                    <div className="d-flex">
                        <Typography variant="body1" className="" color="text.black" > 
                            Inostranniye yaziki
                        </Typography>
                    </div>
                    <div className="d-flex py-1">
                        <Typography variant="body2" className="" color="text.secondary" > 
                            {stringFilter(languages)}
                        </Typography>
                    </div>
                </div>
                <div className="px-3 mt-2" style={{borderLeft:"1px solid rgba(0,0,0,0.6)"}}>
                    <div className="d-flex">
                        <Typography variant="body1" className="" color="text.black" > 
                            Kompyuternie naviki
                        </Typography>
                    </div>
                    <div className="d-flex py-1">
                        <Typography variant="body2" className="" color="text.secondary" > 
                            {stringFilter(computerSkills)}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )

    const ModelForPdf = () => (
        <div style={{padding:'10px', height:'fit-content', display:'flex'}}>
            <div style={{display:'inline-block',width:"60%"}}>
                <div style={{width:"100%", display:'flex'}}>
                    <div style={{width:"25%"}}>
                        <img alt="" src={user.photo&&`${server}static/images/`+user.photo} width="100%" height="" />
                    </div>
                    <div style={{ width:"75%", padding:"10px"}}>
                        <div>
                            <h5>{surname} {name} {lastname}</h5>
                            <div>{stringFilter(profession)}</div>
                        </div>
                        <div>
                             {location}, {moving}
                        </div>
                    </div>
                </div>
                <div style={{paddingBottom:"1,5rem",paddingTop:"1rem"}}>
                    <div style={{paddingTop:"1.5rem",paddingBottom:"1.5rem",paddingLeft:"0.25rem",paddingRight:"0.25rem"}}>
                         <b>Lichnaya informatsiya</b>
                    </div>
                    <div>
                        <div
                        style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}
                        >
                            <span> 
                                Grajdanstvo:
                            </span>
                            <span > 
                                {stringFilter(citizenship)}
                            </span>
                        </div>
                        <div
                        style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}
                        >
                            <span> 
                                Obrazavanie:
                            </span>
                            <span > 
                                {stringFilter(education)}
                            </span>
                        </div>
                        <div
                        style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}
                        >
                            <span> 
                                Data rojdenie:
                            </span>
                            <span > 
                                {stringFilter(birthday?birthday.toString().slice(0, 16):'')}
                            </span>
                        </div>
                        <div
                        style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}
                        >
                            <span> 
                                Pol:
                            </span>
                            <span > 
                                {gender}
                            </span>
                        </div>
                        <div
                        style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}
                        >
                            <span> 
                                Semeynie polojenie:
                            </span>
                            <span > 
                                {spouse?"est semya":"net semi"}, {childs?"est deti":"net deti"}
                            </span>
                        </div>
                        
                    </div>
                    {
                        experience.length!==0&&
                        <>
                            <div style={{paddingTop:"1.5rem",paddingBottom:"1.5rem",paddingLeft:"0.25rem",paddingRight:"0.25rem"}}>
                                 <b>Opit raboti</b>
                            </div>
                            {experience.map((e, i) => (
                                <div key={i} 
                                style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}>
                                    <div>
                                        <span> 
                                            {stringFilter(e.vocation)}
                                        </span>
                                    </div>
                                    <div>
                                        <span> 
                                            {stringFilter(e.organization)}
                                        </span>
                                    </div>
                                    <div>
                                        <span> 
                                            {stringFilter(e.settled?e.settled.toString().slice(0,16):'')} - {stringFilter(e.quit?e.quit.toString().slice(0,16):'')} {e.full}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    }
                    {
                        edu.length!==0&&
                        <>
                            <div  style={{paddingTop:"1.5rem",paddingBottom:"1.5rem",paddingLeft:"0.25rem",paddingRight:"0.25rem"}}>
                                 <b>Obrazavanie</b>
                            </div>
                            {edu.map((e, i) => (
                                <div key={i} 
                                style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}>
                                    <div>
                                        <span> 
                                            {stringFilter(e.institution)}
                                        </span>
                                    </div>
                                    <div>
                                        <span> 
                                            {stringFilter(e.faculty)} ({stringFilter(e.speciality)})
                                        </span>
                                    </div>
                                    <div>
                                        <span> 
                                            {stringFilter(e.ending)} - {e.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    }
                    {
                        course.length!==0&&
                        <>
                        
                            <div  style={{paddingTop:"1.5rem",paddingBottom:"1.5rem",paddingLeft:"0.25rem",paddingRight:"0.25rem"}}>
                                 <b>Kursi i treninggi</b>

                            </div>
                            {course.map((e, i) => (
                                <div key={i} 
                                style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}>
                                    <div>
                                        <span> 
                                            {stringFilter(e.name)}
                                        </span>
                                    </div>
                                    <div>
                                        <span> 
                                            {stringFilter(e.institution)}
                                        </span>
                                    </div>
                                    <div>
                                        <span> 
                                            {stringFilter(e.ending)} - {stringFilter(e.duration)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    }
                    <div style={{paddingTop:"1.5rem",paddingBottom:"1.5rem",paddingLeft:"0.25rem",paddingRight:"0.25rem"}}>
                        <b>Dopolnitelnaa informatsiya</b>
                    </div>
                    <div 
                    style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'0.5rem',paddingRight:'0.5rem',marginRight:"1.5rem",marginLeft:"1.5rem"}}>
                        <div className="d-flex flex-column">
                            {army&&
                            <span> 
                                Slujba v armii
                            </span>
                            }
                            {sanitary&&
                            <span> 
                                Sanitarnaya knijka
                            </span>
                            }
                            {Object.keys(rights).length!==0?
                            <div>
                                <span > 
                                    Voditelskaya prava:
                                </span>
                                <span variant="body2" className=" px-1" color="text.secondary" > 
                                    {Object.keys(rights).map(e => e).join(', ')}
                                </span>
                            </div> :
                            <span> 
                                {stringFilter('')}
                            </span>
                            
                            }
                            {freeTime!==''&&
                            <div className="d-flex flex-column">
                                <span > 
                                    Zanyatie na svobodnoe vremya:
                                </span>
                                <span> 
                                    {freeTime}
                                </span>
                            </div>
                            
                            }
                            {desc!==''&&
                            <div className="d-flex flex-column">
                                <span > 
                                    O sebe:
                                </span>
                                <span> 
                                    {desc}
                                </span>
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:"inline-block",width:"40%"}}>
                <div style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:'1rem',paddingRight:'1rem'}}>
                    <div>
                        <span> 
                            Jelayemaya zarplata
                        </span>
                    </div>
                    <div>
                        <span> 
                            {stringFilter(salary)}
                        </span>
                    </div>
                    <div>
                        <span> 
                            {status[busyness]}
                        </span>
                    </div>
                </div>
                <div
                style={{borderLeft:"1px solid rgba(0,0,0,0.6)",marginBottom:'1rem',marginTop:'1rem',paddingLeft:'1.5rem',paddingRight:"1.5rem"}}>
                    <div>
                        <span > 
                            Kontakti
                        </span>
                    </div>
                    <div style={{paddingTop:"0.25rem", paddingBottom:"0.25rem"}}>
                        <span> 
                            {stringFilter(phone)}
                        </span>
                    </div>
                    <div>
                        <span> 
                            {stringFilter(email)}
                        </span>
                    </div>
                </div>
                <div style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingRight:"1rem",paddingLeft:"1rem",marginTop:"3rem"}}>
                    <div>
                        <span > 
                            Inostranniye yaziki
                        </span>
                    </div>
                    <div style={{paddingTop:"0.25rem",paddingBottom:"0.25rem"}}>
                        <span> 
                            {stringFilter(languages)}
                        </span>
                    </div>
                </div>
                <div 
                style={{borderLeft:"1px solid rgba(0,0,0,0.6)",paddingLeft:"1rem",paddingRight:"1rem",marginTop:"0.5rem"}}>
                    <div>
                        <span> 
                            Kompyuternie naviki
                        </span>
                    </div>
                    <div style={{paddingTop:"0.25rem",paddingBottom:"0.25rem"}}>
                        <span> 
                            {stringFilter(computerSkills)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

    return {ModelForView, ModelForPdf}
}