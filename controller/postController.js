const Post = require('../models/post');


const createPost = async (req, res) => {
    try{
        const {title, content} = req.body;

        if(title || content ) {
            return res.status(400).json({message: 'Title and content are required'});
        }

        const newPost = new Post({
            title,
            content,
            author: req.user.id,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch(error) {
        res.status(500).json({message: 'Internal server error'});
    }
};

const getPosts = async (req, res) => {
    try{
        const post = await Post.find().popular('author', 'name email');
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({message: 'Internal server error', error: error.message});
    }
};

const getPostbyId = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json(post);
    } catch(error){
        res.status(500).json({message: 'Internal server error', error: error.message});
    }
};

const updatePost = async (req, res) => {
    try{
        const {title, content} = req.body;
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({message: 'Post not found'});
    }

    if(!post.author.toString() !== req.user.id) {
        return res.status(403).json({message: 'You are not authorized to update this post'});
    }
    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
} catch(error){
    res.status(500).json({ message: 'Internal Server Error', error: error.message});
}
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {createPost, getPosts, getPostbyId, updatePost, deletePost};