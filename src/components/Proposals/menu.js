import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProposal } from '../../hooks/proposal.hook';
import { columnnames } from '../Filtr';
const ITEM_HEIGHT = 48;

export default function LongMenu({id, status, answer}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {updateBid} = useProposal()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = async (state, status = false) => {
    if(typeof status === 'number') {
      await updateBid({id, status}, answer)
    }
    if(typeof state === 'string') {
      await updateBid({id, state}, answer)
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        className="text-black"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleClose('success')} className="text-success px-1">
              <DoneAllIcon className="px-1"/> <span className=''>Успешно завершено</span> 
          </MenuItem>
          <MenuItem onClick={() => handleClose('selected')} className="text-info px-1">
          <BookmarkIcon className="px-1"/> <span className=''>Избранное</span> 
          </MenuItem>
          <MenuItem onClick={() => handleClose('fail')} className="text-danger px-1">
          <DeleteIcon className="px-1" /> <span className=''>Отказ</span>
          </MenuItem>
          <hr />
          {
            columnnames.filter((e,i) => i!==status).map(e => (
              <MenuItem key={e} onClick={() => handleClose(false, columnnames.indexOf(e))} style={{fontSize:"0.9rem"}} className="text-secondary px-1">
              <ChangeCircleIcon className="px-1" /><span className=''>{e}</span>
              </MenuItem>
            ))
          }
      </Menu>
    </div>
  );
}
