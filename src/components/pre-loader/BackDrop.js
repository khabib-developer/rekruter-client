import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const BackgroundLoader = () => {
    const {loading} = useSelector(s => s.app)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 10000}}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}