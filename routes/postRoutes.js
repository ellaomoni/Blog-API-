const express = require('express');
const router = express.Router();

const {createPost, getPosts, getPostbyId, updatePost, deletePost} = require('../controller/postController');
const { verifyToken , isAdmin} = require('../middlewares/authMiddleware');
const {addComment, deleteComment, getCommentsByPost} = require('../controller/commentController');


//Post-related routes
router.post('/create', verifyToken, createPost);
router.get('/posts', getPosts);
router.get('/:id', getPostbyId);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id',verifyToken, isAdmin, deletePost);


//comment-related routes
router.post('/:id/comments', verifyToken, addComment);
router.get('/:id/comments', getCommentsByPost);
router.delete('id:/comments/:commentId', verifyToken, deleteComment);

module.exports = router;
