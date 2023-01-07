import * as React from 'react';
import { LoadingButton } from '@mui/lab';

export default function LoadingBtn({ type, onClick, loading, children, StartIcon, size, sx, loadingPosition="start", variant="contained" }) {
    return (
        <LoadingButton
            // color="secondary"
            onClick={onClick}
            loading={loading}
            loadingPosition={loadingPosition}
            startIcon={<StartIcon />}
            variant={variant}
            size={size}
            type={type || 'button'}
            sx={sx}
        >
            {children}
        </LoadingButton>
    );
}
