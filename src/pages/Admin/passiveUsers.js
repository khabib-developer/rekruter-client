import React, {useState, useEffect} from 'react';
import {useAdmin} from '../../hooks/admin.hook'


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/actions';
import DateObject from 'react-date-object';
import Modal from './additionInfo';

const columns = [
    { id: 'name', label: 'Имя', minWidth: 100 },
    {
      id: 'population',
      label: 'Контакт',
      minWidth: 100, },
    {
      id: 'size',
      label: 'E-mail',
      minWidth: 100, },
    {
      id: 'density',
      label: 'Был доступен до',
      minWidth: 100},
    {
        id: 'density',
        label: 'Открыть доступ до',
        minWidth: 100
    },
];

export function PassiveUsers({users, setusers}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [open, setOpen] = useState(false)

    const {getUserInfo} = useAdmin()

    const dispatch = useDispatch()

    const {updateUserWithId} = useAdmin()

    const [clients, setclients] = useState(users)
    
    useEffect(() => {
        setclients(users)
        if(clients.length !==0 ) {
                clients.sort((a, b) => +b.id - +a.id).forEach(element => {
                    element.date = Date.parse(new Date(Date.now()))
                });
        }
    }, [users])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeStatus = async (id) => {
        const element = clients.find(e => e.id === id)

        console.log(element.date - Date.now())

        if(element.date - Date.now() < 120000) {
            dispatch(setError("С головой что то не так?"))
            return
        }

        
        const res = await updateUserWithId({
            id, 
            status: JSON.stringify({ date:element.date, start:Date.now() }),
            start: Date.now(),
            stop: element.date
         })
        setusers(res)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = async user => {
        const res = await getUserInfo({id:user.id})

        setOpen({...user, ...res})
    }


    return (
        <div className="px-4 d-flex align-items-center" style={{height:"100vh", background:"transparent"}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column,i) => (
                        <TableCell
                        key={i}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients.sort((a, b) => +b.id - +a.id)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,i) => {
                        const date = new DateObject( Number( JSON.parse(row.status).date ) )
                        const h = new Date( Number( JSON.parse(row.status).date ) )
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                            {[
                                <TableCell onClick={() => handleClick(row)} key={0} style={{cursor:"pointer"}} className="">
                                    {row.name}
                                </TableCell>,
                                <TableCell key={1} className="">
                                    <a className="text-success" href={`tel:${row.phone}`}>{row.phone}</a>
                                </TableCell>,
                                <TableCell key={2} className="">
                                    <a className="text-success" href={`mailto:${row.email}`}>{row.email}</a>
                                </TableCell>,   
                                <TableCell key={4} className="text-muted">
                                    {date.format('YYYY.MM.DD')} {h.toString().slice(16,21)}
                                </TableCell>, 
                                <TableCell key={3} className="">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            ampm={false}
                                            renderInput={(props) => <TextField variant="standard" hiddenLabel {...props} />}
                                            disablePast
                                            value={row.date}
                                            onChange={(newValue) => {

                                                if(Date.parse(newValue) - Date.now() > 120000) {
                                                    setclients(prev => ([ ...prev.sort((a, b) => +b.id - +a.id).filter( (e,j) => j!==i ), {...prev[i], date:Date.parse(newValue) } ] ) )
                                                }

                                            }}
                                        />
                                        <Button className='mx-4 bg-white text-muted' onClick={() => handleChangeStatus(row.id)}>
                                            Открыть 
                                        </Button>
                                    </LocalizationProvider>
                                </TableCell>, 
                            ]}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
            <Modal user={open} setOpen={setOpen} />
        </div>
    );
}
