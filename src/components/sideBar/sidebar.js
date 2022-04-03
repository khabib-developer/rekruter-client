import React from "react";
import { List, ListItemButton} from "@mui/material";

import './style.css'

export const SideBarAd = ({selected, setselected}) => {
    return (
        <div className="sidebar bg-light" style={{top:0, height:"100vh", width:"300px"}}>
            <h3 className="pt-4 pb-1 text-center text-success">Hola</h3>
            <div className="list text-center px-1">
                <List>
                    <ListItemButton sx={{background:selected===1?"#f0f0f0":''}} onClick={() => setselected(1)} >
                        {/* <CreateIcon /> */}
                        <span className="px-3 text-muted">Пользователи еще не получившие доступа </span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:selected===2?"#f0f0f0":''}} onClick={() => setselected(2)} >
                        {/* <StorageIcon /> */}
                        <span className="px-3 text-muted">Активные пользователи  </span> 
                    </ListItemButton>
                    <ListItemButton sx={{background:selected===3?"#f0f0f0":''}} onClick={() => setselected(3)} >
                        {/* <AddBoxIcon /> */}
                        <span className="px-3 text-muted">Пользователи с просроченным доступом</span> 
                    </ListItemButton>
                    {/* <ListItemButton sx={{background:selected===4?"#f0f0f0":''}} onClick={() => setselected(4)} >
                        <span className="px-3 text-danger">Администраторы </span> 
                    </ListItemButton> */}
                    <ListItemButton sx={{background:selected===6?"#f0f0f0":''}} onClick={() => setselected(5)} >
                        {/* <ArchiveIcon /> */}
                        <span className="px-3 text-secondary">История </span> 
                    </ListItemButton>
                    
                </List>
            </div>
        </div>
    )
}