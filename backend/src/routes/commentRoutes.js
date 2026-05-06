import { Router } from "express";
import { getCommentsByPost, createComment, deleteComment } from "../controllers/commentController.js";
import { authenticateToken, requireAuthor } from "../middleware/authMiddleware.js";

const router = Router()

router.get('/:postId/comments', getCommentsByPost)
router.post('/:postId/comments', createComment)

router.delete('/:postId/comments/:commentId', authenticateToken, requireAuthor, deleteComment)

export default router