import { Router } from 'express'
import { addPost, editPost, getPosts, removePost } from '../controllers/postController.js'

const router = Router()

router.get('/', getPosts)
router.post('/', addPost)
router.put('/:id', editPost)
router.delete('/:id', removePost)

export default router


