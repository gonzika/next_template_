import { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function MyBackDrop() {
    const [show, set_show] = useState(false)

    useEffect(() => {
        let isMounted = true
        window.showSpinner = (data) => {
            if (isMounted) set_show(data)
        }
        return () => { isMounted = false }
    }, [])

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={show}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}