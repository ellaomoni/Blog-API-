const expresss = require('express');
const router = expresss.Router();

const { addComment, deleteComment, getCommentsByPost } = require('../controller/commentController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/:id', verifyToken, addComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/:id', getCommentsByPost);

module.exports = router;