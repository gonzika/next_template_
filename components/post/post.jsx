import { Box, Card, CardContent, Typography, Grid, } from '@mui/material'
import { formatRelative } from 'date-fns'
import { useEffect, useState } from 'react'
import State from '../state'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingIcon from '../atoms/loadingIcon'
import LongMenu from './longMenu'


export default function Post({ post, set_posts, PHOTO_URL, user, t }) {
    const [loading, set_loading] = useState(false)

    function menuSelectHandler(option) {
        switch (option) {
            case 'Delete':
                deletePost()
                break
        }
    }

    function deletePost() {
        window.showSpinner(true)
        State.request('/api/posts/delete', { id: post._id }).then(res => {
            set_posts(res.OK)
            window.showSpinner(false)
        }).catch((error) => {
            window.showSpinner(false)
            window.showAlert(error, 'error')
        })
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined"
                sx={{
                    position: 'relative',
                    width: { xs: '100%', sm: 275 },
                    height: { xs: 400 }
                }}
            >
                <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <LongMenu
                        menuSelectHandler={menuSelectHandler}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0
                        }}>
                        {[
                            'None',
                            undefined,
                            user?.id === post.author._id && 'Delete'
                        ]}
                    </LongMenu>


                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{post.author.name}</Typography>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        {/* {formatRelative(new Date(post.date), new Date())} */}
                        {formatRelative(new Date(post.date), new Date(), { locale: State.context.locale })}
                    </Typography>

                    <Typography variant="body2">{post.text}</Typography>

                    <Box style={{ overflow: 'hidden', height: '100%' }}>
                        {post.photos?.map(photo => <img key={photo._id} style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            src={PHOTO_URL + photo.link} />)}
                    </Box>

                </CardContent>
            </Card>
        </Grid >

    )
}