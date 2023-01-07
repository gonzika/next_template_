import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export default function PleaseLoginModal() {
    return (
        <>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                You are not login
            </Typography>
            <Button variant="outlined" onClick={signIn}>Login</Button>
        </>
    )
}