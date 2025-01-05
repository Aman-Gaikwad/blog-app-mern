import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost, deletepost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/createpost', verifyToken, createPost);
router.get('/getposts',getPosts);
router.delete('/deletepost/:postID/:userID', verifyToken, deletepost)

export default router;