import React from "react";
import { useSelector } from "react-redux";
import { ArchiveFIlter } from "../Filtr";
import Schedule from '../Table'


export const Archive = () => {

    const {stockProposals} = useSelector(s => s.ui)

    const [rows, setrows] = React.useState(stockProposals.filter(e => e.state !== null))

    React.useEffect(() => {
        setrows(stockProposals.filter(e => e.state !== null))
        console.log(2)
    }, [stockProposals])
    
    return (
        <>
            <ArchiveFIlter setrows={setrows}  />
            <Schedule rows={rows} />
        </>
    )
}