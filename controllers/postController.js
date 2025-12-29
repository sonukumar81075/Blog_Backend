import { createPost, deletePost, findAll, updatePost } from '../models/postModel.js'

const validatePayload = (body) => {
  const { title, content, author } = body ?? {}
  if (!title || !content || !author) {
    return 'Title, author, and content are required.'
  }
  return null
}

export const getPosts = async (_req, res) => {
  try {
    const posts = await findAll()
    return res.json(posts)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to load posts' })
  }
}

export const addPost = async (req, res) => {
  const error = validatePayload(req.body)
  if (error) return res.status(400).json({ message: error })

  try {
    const post = await createPost(req.body)
    return res.status(201).json(post)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to create post' })
  }
}

export const editPost = async (req, res) => {
  const { id } = req.params
  const error = validatePayload(req.body)
  if (error) return res.status(400).json({ message: error })

  try {
    const updated = await updatePost(id, req.body)
    if (!updated) return res.status(404).json({ message: 'Post not found.' })
    return res.json(updated)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to update post' })
  }
}

export const removePost = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await deletePost(id)
    if (!deleted) return res.status(404).json({ message: 'Post not found.' })
    return res.status(204).send()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to delete post' })
  }
}


