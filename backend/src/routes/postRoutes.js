import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost, togglePublish } from "../controllers/postController.js";
import { authenticateToken, requireAuthor } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", authenticateToken, requireAuthor, createPost);
router.put("/:id", authenticateToken, requireAuthor, updatePost);
router.delete("/:id", authenticateToken, requireAuthor, deletePost);
router.patch("/:id/publish", authenticateToken, requireAuthor, togglePublish);

export default router;
