import React from "react";
import { useSelector } from "react-redux";
import './style.css'


export const PageLoader = () => {
    const {pageloader} = useSelector(s => s.app)
    return (
        // <>
        //     <div className={`box ${pageloader}`} >
        //         <div className="box_container">
        //             <p className="box_content">Rekruter</p>
        //         </div>
        //     </div>
        // </>
        <div className="d-flex justify-content-center align-items-center text-muted" style={{height:"100vh"}}>Loading...</div>
    )
}