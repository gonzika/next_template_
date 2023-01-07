import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import State from '../state';
import CloseIcon from '@mui/icons-material/Close';
import { Fab, IconButton } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxWidth: '100%',
    width: {xs: '100%', sm: 400},
    height: {xs: '100%', sm: 'auto'}
};


export default function TransitionsModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function openModal(open) {
        setOpen(open)
    }

    useEffect(() => {
        State.modal.openModal = openModal
        State.modal.Component = <DefaultModal />
    }, [])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton aria-label="Close" onClick={() => openModal(false)} 
                        sx={{
                            position:'absolute',
                            top: 0,
                            right: 0
                        }}
                    >
                        <CloseIcon />
                    </IconButton >

                    {State.modal.Component}
                </Box>
            </Fade>
        </Modal>
    )
}

function DefaultModal() {
    return (
        <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </div>
    )
}