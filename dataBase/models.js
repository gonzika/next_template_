import mongoose from 'mongoose';
const { Schema } = mongoose;


const photosSchema = new Schema({
    link: { type: String, maxLength: 2000 },
    user_id: String,
});

const postSchema = new Schema({
    text: { type: String, maxLength: 2000 },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    photos: [{
        type: photosSchema,
        default: () => ({})
    }],
    date: { type: Date, default: Date.now },
}, {
    strictQuery: 'throw',
    methods: {
        async deleteWithPhotos(user_id) {
            if (String(this.author) !== String(user_id)) throw 'There is not yours'
        
            if (this.photos.length) {
                const { Storage } = require('@google-cloud/storage');
                const storage = new Storage({ keyFilename: process.env.GOOGLE_KEY_JSON })
        
                this.photos.forEach(async photo => {
                    await storage.bucket(process.env.STORAGE_BUCKET).file(photo.link).delete()
                })
            }
        
            return this.remove()
        }
    }
})
// postSchema.pre('remove', { document: true, query: false }, function (next) {
//     console.log(1111, this)
//     next();
// })


export const Posts_DB = mongoose.models.posts || mongoose.model('posts', postSchema)
Posts_DB.getAllPosts = function () {
    return this.find({}).populate('author', 'name')  //  -_id delete id field
}


const usersSchema = new Schema({
    name: String,
    email: String,
    image: String,
    emailVerified: Boolean,
});


export const Photos_DB = mongoose.models.photos || mongoose.model('photos', photosSchema)

export const Users_DB = mongoose.models.users || mongoose.model('users', usersSchema)

