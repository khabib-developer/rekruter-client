import React from "react";
import CreateIcon from '@mui/icons-material/Create';
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import HistoryIcon from '@mui/icons-material/History';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArchiveIcon from '@mui/icons-material/Archive';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { List, ListItemButton} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../redux/actions";

import './style.css'

export const SideBar = () => {
    const {sideBarShow, tab} = useSelector(s => s.ui)
    const dispatch = useDispatch()
    const left = sideBarShow?'0px':"-250px"
    return (
        <div className="bg-white sidebar" style={{left}}>
            <h3 className="pt-4 pb-1 text-center">Operacii</h3>
            <div className="list text-center px-3">
                <List>
                    <ListItemButton sx={{background:tab===5?"#f0f0f0":''}} onClick={() => dispatch(setTab(5))} >
                        <BarChartIcon />
                        <span className="px-3">Главная</span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:tab===1?"#f0f0f0":''}} onClick={() => dispatch(setTab(1))} >
                        <CreateIcon />
                        <span className="px-3">Создать вакансию</span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:tab===2?"#f0f0f0":''}} onClick={() => dispatch(setTab(2))} >
                        <StorageIcon />
                        <span className="px-3">Сделки </span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:tab===3?"#f0f0f0":''}} onClick={() => dispatch(setTab(3))} >
                        <AddBoxIcon />
                        <span className="px-3">Создать форму</span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:tab===4?"#f0f0f0":''}} onClick={() => dispatch(setTab(4))} >
                        <HistoryIcon />
                        <span className="px-3">Мои формы</span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:tab===6?"#f0f0f0":''}} onClick={() => dispatch(setTab(6))} >
                        <ArchiveIcon />
                        <span className="px-3">Архив</span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:tab===7?"#f0f0f0":''}} onClick={() => dispatch(setTab(7))} >
                        <LockOpenIcon className="text-danger" />
                        <span className="px-3">Доступ к сайту </span> 
                    </ListItemButton>
                    
                </List>
            </div>
        </div>
    )
}