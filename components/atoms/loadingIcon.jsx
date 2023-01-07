import { CircularProgress, IconButton } from "@mui/material";

export default function LoadingIcon({loading, children, size, onClick, sx}) {
    return (
        <IconButton 
            onClick={onClick}
            sx={sx}
            disabled={loading}
        >
            {loading ? <CircularProgress size={size} /> : children}
        </IconButton>
    )
}