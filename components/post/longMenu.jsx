import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';


const ITEM_HEIGHT = 48;

export default function LongMenu({ children, sx, menuSelectHandler }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        if (typeof option === 'string') menuSelectHandler(option)
        setAnchorEl(null);
    };

    return (
        <Box sx={sx}>
            <IconButton
                aria-label="more"
                id="long-button"
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
                {children.map((option) => (
                    !option ? null :
                    <MenuItem
                        key={option}
                        // selected={option === 'Pyxis'}
                        onClick={() => handleClose(option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
