const Comment = require('../models/comment');
const Post = require('../models/post');


const addComment = async (req, res) => {
    try{
        const {id} = req.params;
        const {content} = req.body;

        if(!content) {
            return res.status(400).json({message: 'Content is required'});
        }
        const post = Post.findByid(id);
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        const newComment = await Comment.create({
            post: id,
            content,
            user: req.user.id,
        });
        res.status(201).json({message: 'Comment added successfully', comment: newComment});
    } catch (error){
        res.status(500).json({message: 'Internal server error', error: error.message});
    }  
};

const deleteComment = async (req, res) => {
    try{
        const {id} = req.params;


        const comment = await Comment.findById(Id);
        if(!comment) {
            return res.status(404).json({message: 'Comment not found'});
        }

        if(comment.user.toString()!== req.user.id){
            return res.status(403).json({message: 'You can only delete your comment'});
        }

        await comment.deleteOne();
        res.status(200).json({message: 'Comment deleted successfully'});
    }catch(error){
        res.status(500).json({message: 'Internal server error', error: error.message});
    }
};

const getCommentsByPost = async (req, res) => {
    try{
        const {id} = req.params;

        const comments = await Comments.find({post: id}).populate('user', 'name email');
        res.status(200).json(comments);
    } catch(error){
        res.status(500).json({message: 'Internal server error', error: error.message});
    }
};

module.exports = {addComment, deleteComment, getCommentsByPost};