import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


export const EventModal = ({id, title, memo, eventDelete}) =>{
  const  [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return(
    <>
      <Dialog
        open={open}
        onClose={()=>{
          handleClose();
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>

        </DialogContent>
      </Dialog>

    </>
    ) 
  }

// export default EventModal