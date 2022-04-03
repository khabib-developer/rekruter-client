import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Tooltip } from '@mui/material';
import { useProposal } from '../../hooks/proposal.hook';
import { useAnswer } from '../../hooks/answer.hook';

const columns = [
  { id: 'name', label: 'Откуда', minWidth: 40 },
  { id: 'code', label: 'Название', minWidth: 100 },
  {
    id: 'population',
    label: 'Имя ',
    minWidth: 100, },
  {
    id: 'size',
    label: 'Контакт',
    minWidth: 100, },
  {
    id: 'density',
    label: 'Вакансия',
    minWidth: 100,},
];

const classes = {
  'success':"text-success",
  "selected":"text-secondary",
  "fail":"text-danger"
}

export default function Schedule({rows}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {updateBid, remove} = useProposal()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600, overflow:'scroll' }}>
        <Table stickyHeader aria-label="sticky table" style={{minWidth:"756px"}}>
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,i) => {
                return (
                  <TableRow key={i} hover className='' role="checkbox" tabIndex={1} >
                    {[
                      <TableCell key={0} className={classes[row.state]}>
                        {row.name_of_form?"Реферальная ссылка":"Вакансия"}
                      </TableCell>,
                      <TableCell key={1} className={classes[row.state]}>
                        {row.name_of_form?
                          <a href={`${window.location.origin}/form/${row.token}`} className={classes[row.state]} target="_blank" rel="noreferrer">{row.name_of_form}</a>
                        :row.vacancy.title}
                      </TableCell>,
                      <TableCell key={2} className={classes[row.state]}>
                        {row.name_of_form?JSON.parse(row.data).name:
                        <Link to={`/user/${row.user_id}`} className='text-success'>{row.name}</Link>
                        }
                      </TableCell>,
                      <TableCell key={3} className={classes[row.state]}>
                        {row.name_of_form?
                        <a className={classes[row.state]} href={`tel:${JSON.parse(row.data).phone}`}>{JSON.parse(row.data).phone}</a>:
                        ''
                        }
                      </TableCell>,
                      <TableCell key={4} className={`${classes[row.state]} d-flex justify-content-between`}>
                        <div>
                          {row.name_of_form?
                          JSON.parse(row.data).job
                          :
                          row.vacancy.type
                          }
                        </div>
                        <div className='d-flex'>

                          <Tooltip title="Удалить">
                            <div className="px-2" onClick={async () => await remove(row.id)} style={{cursor:"pointer"}}>
                              <DeleteIcon />
                            </div>
                          </Tooltip>
                          <Tooltip title="вернуть">
                            <div onClick={async () => await updateBid({id:row.id, state:null}, !!row.name_of_form)} style={{cursor:"pointer"}}>
                              <ArrowCircleUpIcon />
                            </div>
                          </Tooltip>
                        

                        </div>
                        
                        
                        
                      </TableCell>

                    ]}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="span"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
