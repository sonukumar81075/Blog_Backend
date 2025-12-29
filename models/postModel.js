import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  },
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export const findAll = async () =>
  Post.find().sort({ updatedAt: -1 }).lean({ virtuals: true })

export const createPost = async ({ title, author, content }) => {
  const post = new Post({ title, author, content })
  await post.save()
  return post.toJSON()
}

export const updatePost = async (id, { title, author, content }) =>
  Post.findByIdAndUpdate(
    id,
    { title, author, content },
    { new: true, runValidators: true, lean: true, virtuals: true },
  )

export const deletePost = async (id) => {
  const deleted = await Post.findByIdAndDelete(id)
  return Boolean(deleted)
}


