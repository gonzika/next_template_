import { Box, Slide } from "@mui/material";
import { useEffect, useState } from "react"
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

let alertTimeout

export default function MyAlert() {
    const [show, set_show] = useState(false);
    const [title, set_title] = useState('nfgngf')
    const [style, set_style] = useState('error')
    const [message, set_message] = useState('gerbreer')
    const [click, set_click] = useState(undefined)

    useEffect(() => {
        let isMounted = true

        window.showAlert = (mes = "", type, time = 10000, clickHandler = undefined) => {
            if (!isMounted) return
            try {
                set_message(mes)
            } catch (error) {
                set_message('Problems with parse server\'s response (it is object)')
            }

            if (clickHandler) set_click(() => clickHandler)
            if (!clickHandler && click) set_click(undefined)

            if (type === 'error') {
                set_style('error')
            } else if (type === 'warning') {
                set_style('warning')
            } else if (type === 'success') {
                set_style('success')
            } else if (type === 'info') {
                set_style('info')
            }

            set_show(true)
            clearTimeout(alertTimeout)
            alertTimeout = setTimeout(() => {
                set_show(false)
                clearTimeout(alertTimeout)
            }, time);
        }

        return () => { isMounted = false }
    }, [])


    return (
        <Box style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <Slide direction="up" in={show} mountOnEnter unmountOnExit>
                <Alert
                    onClick={click}
                    severity={style}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                set_show(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {message}
                </Alert>
            </Slide>
        </Box>
    )
}