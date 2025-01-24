const express = require('express');
const router = express.Router();

const {createPost, getPost, getPostbyId, updatePost, deletePost} = require('../controller/postController');


router.post('/create', createPost);
router.get('/', getPost);
router.get('/:id', getPostbyId);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
