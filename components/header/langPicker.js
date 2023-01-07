import { MenuItem, Select } from "@mui/material";
import State from "../state";
import setLanguage from 'next-translate/setLanguage'

export default function LangPicker({locale}) {
    function changeLang(e) {
        State.setCookie('NEXT_LOCALE', e.target.value, { secure: true, 'max-age': 2592000000, SameSite: 'None' });
        setLanguage(e.target.value)
    }

    return (
        <Select
            value={locale}
            onChange={changeLang}
            variant="standard"
            disableUnderline
            width={100}
            sx={{
                pl: '5px',
                borderRadius: 1,
                ' .MuiSelect-select:focus': {
                    bgcolor: 'initial'
                },
                color: 'inherit'
            }}
        //   displayEmpty
        //   inputProps={{ 'aria-label': 'Without label' }}
        >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ua">UA</MenuItem>
        </Select>
    )
}