import { getSession } from "next-auth/react"

import mongoose from "mongoose"
import { Posts_DB } from "../../../dataBase/models"


export default async function handler(req, res) {
    const session = await getSession({ req })

    const original_id = mongoose.mongo.ObjectId(req.body.id)

    try {
        const post = await Posts_DB.findOne({_id: original_id})
        await post.deleteWithPhotos(session.user.id)
    } catch (error) {
        // console.log(error)
        return res.status(200).json({ ERROR: error })
    }
    

    const posts = await Posts_DB.getAllPosts()
    res.status(200).json({ OK: posts })
}
