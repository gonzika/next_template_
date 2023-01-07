import { getSession } from "next-auth/react"

import mongoose from "mongoose"
import { Posts_DB } from "../../../dataBase/models"


export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) return res.status(200).json({ ERROR: 'You are not login' })
    
    const original_id = new mongoose.mongo.ObjectId()
    const user_id = mongoose.mongo.ObjectId(session.user.id)

    
    const Posts = await new Posts_DB({
        _id: original_id,
        author: user_id,
        text: req.body.text
    })

    
    if (req.body.file) {
        const { Storage } = require('@google-cloud/storage');
        const storage = new Storage({ keyFilename: process.env.GOOGLE_KEY_JSON });

        for (const key in req.body.file) {
            const filename = String(original_id) + '_' + key
            await storage.bucket(process.env.STORAGE_BUCKET).file(filename)
                .save(Buffer.from(req.body.file[key].base64.replace(`data:${req.body.file[key].type};base64,`, ''), 'base64'));

            Posts.photos.push({
                link: filename,
                user_id: String(user_id),
            })
        }
    }
    
    await Posts.save()
    
    const posts = await Posts_DB.getAllPosts()
    res.status(200).json({ OK: posts })
}
