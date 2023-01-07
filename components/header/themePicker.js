import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import State from '../state';

export default function ThemePicker() {
    const theme = useTheme();

    function changeTheme(e) {
        const darktheme = window.localStorage.getItem('darktheme') === 'true'
        window.localStorage.setItem('darktheme', !darktheme)
        State.changeTheme()
    }

    return (
        <IconButton color="inherit" onClick={changeTheme} >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
}