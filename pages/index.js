import { Grid } from "@mui/material"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import AddPost from "../components/post/addPost"
import Post from "../components/post/post"

import { Posts_DB } from "../dataBase/models"


export default function Main({ pageProps }) {
  const { data: session } = useSession()
  const { t } = useTranslation('common')
  const [posts, set_posts] = useState(pageProps.posts)
  
  return (
    <>
      <AddPost set_posts={set_posts} session={session} />
      {posts && 
      <Grid container spacing={1} mt={2} 
        display={{xs: 'block', sm: 'flex'}} 
        // justifyContent={'center'}
      >
        {posts.map(post =>
          <Post key={post._id} t={t}
            post={post} set_posts={set_posts}
            PHOTO_URL={pageProps.STORAGE_PUBLIC_BUCKET_URL} user={session?.user}
          />)}
        </Grid >}
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  const posts = await Posts_DB.getAllPosts()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      STORAGE_PUBLIC_BUCKET_URL: process.env.STORAGE_PUBLIC_BUCKET_URL
    }
  }
}

