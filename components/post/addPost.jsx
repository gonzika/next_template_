import { useState } from "react"
import State from "../state"
import LoadingBtn from "../atoms/loadingBtn"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import PleaseLoginModal from "../modal/pleaseLogin";
import SaveIcon from '@mui/icons-material/Save'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function AddPostBtn(props) {
    const { session } = props

    function openModal() {
        if (!session) State.modal.Component = <PleaseLoginModal {...props} />
        else State.modal.Component = <AddModal {...props} />

        State.modal.openModal(true)
    }

    return (
        <Fab color="primary" aria-label="add" onClick={openModal}
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
            }}
        >
            <AddIcon />
        </Fab>
    )
}

function AddModal({ set_posts, session }) {
    const [loading, set_loading] = useState(false)
    const [imageSrc, set_imageSrc] = useState()

    async function submitHandler(event) {
        event.preventDefault()
        const form = new FormData(event.target)
        set_loading(true)

        const body = {
            text: form.get('text'),
            file: form.get('file'),
        }

        if (body.file && body.file.name && body.file.size) {
            body.file = {
                [body.file.name]: {
                    base64: await toBase64(body.file),
                    type: body.file.type
                }
            }
        }

        State.request('api/posts/add', body).then((res) => {
            event.target.reset()
            set_posts(res.OK)
            set_loading(false)
            State.modal.openModal(false)
        })
            .catch(() => set_loading(false))
    }

    function fileInputChangeHandler(event) {
        const files = event.target?.files || [];

        if (FileReader && files && files.length) {
            const fr = new FileReader();
            fr.onload = function () {
                set_imageSrc(fr.result)
            }
            fr.readAsDataURL(files[0]);
        } else {
            set_imageSrc()
        }
    }

    return (
        <Stack
            component="form"
            spacing={1}
            // sx={{
            // }}
            // noValidate
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <Typography variant="h2" mb={2}>Add post</Typography>
            <TextField label="Text" variant="outlined" name="text" required/>

            <Stack direction="row" spacing={2}>
                <label>
                    <input type="file" name="file" accept="image/*" hidden onChange={fileInputChangeHandler} />
                    <Button variant="contained" component="span">
                        Upload <PhotoCamera sx={{ ml: 1 }} />
                    </Button>
                </label>
                
                <img src={imageSrc} height={36} />
            </Stack>

            <div><LoadingBtn type="submit" size="medium" sx={{ mt: 2 }} loading={loading} StartIcon={SaveIcon}>Send</LoadingBtn></div>
        </Stack >
    )
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});