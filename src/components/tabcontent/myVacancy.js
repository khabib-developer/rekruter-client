import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/form.hook";
import DateObject from "react-date-object";
import CopyToClipboard from "react-copy-to-clipboard";
import { Divider, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { setSuccess } from "../../redux/actions";

import CopyAllIcon from '@mui/icons-material/CopyAll';

export const MyVacancy = () => {
    const {deleteForm} = useForm()
    const dispatch = useDispatch()
    const {form} = useSelector(s => s.app)

    return (
        <List className="py-lg-3 pt-0 px-lg-4">
            
            {form.length===0&&<div>U vas netu formi</div>}
            {form.map((item, i) => {
                const date = new DateObject(+item.date)
                return (
                    <ListItem disablePadding key={i} >
                        <ListItemButton className="d-flex">
                            <div className="col-6"> 
                                <a  className="text-muted"
                                    href={`${window.location.origin}/form/${item.token}`} 
                                    target="_blank" rel="noreferrer">{item.title}
                                </a>
                            </div>
                            <div className="col-4"> 
                                <div>{date.format("MM.DD.YYYY")}</div>
                            </div>
                            <div className="col-1"> 
                                <CopyToClipboard 
                                    onCopy={() => dispatch(setSuccess('Скопировано'))}
                                    text={`${window.location.origin}/form/${item.token}`}>
                                    <CopyAllIcon />
                                </CopyToClipboard>
                            </div>
                            <div className="col-1"> 
                                <IconButton onClick={() => deleteForm({token:item.token})}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ListItemButton>
                    <Divider />

                    </ListItem>
                )
            })}
        </List>
    )
}