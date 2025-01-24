const express = require('express');
const router = express.Router();

const {createPost, getPosts, getPostbyId, updatePost, deletePost} = require('../controller/postController');
const { verifyToken , isAdmin} = require('../middlewares/authMiddleware');



router.post('/create', verifyToken, createPost);
router.get('/', getPosts);
router.get('/:id', getPostbyId);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id',verifyToken, isAdmin, deletePost);

module.exports = router;
