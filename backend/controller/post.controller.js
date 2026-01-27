const Post = require("../models/Post");
const User = require("../models/User");
const uploadMedia = require("../multer/upload.middleware");

const url = 'http://172.16.3.228:5000'

// Create a New Post
exports.createPost = async (req, res)=>{
    try {
        const images = req.files?.images || [];
        const videos = req.files?.videos || [];

        if (!images.length && !videos.length) {
            return res.status(400).json({
                message: 'Please upload at least one image or video'
            });
        }

        const media = [
            ...images.map(f => `${url+`/`+f.path}`),
            ...videos.map(f => `${url+`/`+f.path}`)
        ];

        var {caption} = req.body;
        const post = await Post.create({
            user: req.user.id,
            media: media,
            caption: caption
        });

        await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: 1 } });

        res.status(201).json({success:true, post});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
};

// Get All Posts
exports.getAllPosts = async (req, res)=>{
    try {
        const posts = await Post.find({isDeleted:false})
        .populate('user', 'username email')
        .populate('comments.user', 'username')
        .sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message});
    }
}

// Get Post by query
exports.getPost = async (req, res)=>{
    try {
        const postId = req.query.postid;
        if(postId){
            const post = await Post.findOne({_id: postId, isDeleted: false})
            .populate('user', 'name profilePic')
            
            if(!post){
                return res.status(404).json({message:"Post not found!"})
            }
            return res.status(200).json(post)
        }

        // if no post id in query fetch all posts
        const posts = await Post.find({isDeleted: false})
            .populate('user', 'name profilePic')
            .sort({createdAt: -1});
        res.status(200).json(posts);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};

// Update Post
exports.updatePost = async (req, res)=>{
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            user: req.user.id,
            isDeleted: false
        });
        if(!post){
            return res.status(404).json({message:"Not authorizes or post not found!"});
        }
        // Handle new media uploads from req.files, if any
        const body = req.body || {};

        const newImages = req.files?.images || [];
        const newVideos = req.files?.videos || [];
        const newUploadedMedia = [
            ...newImages.map(f => `/${f.path}`),
            ...newVideos.map(f => `/${f.path}`)
        ];

        let mediaUpdate = null;
        if (newUploadedMedia.length > 0) {
            mediaUpdate = newUploadedMedia;
        } else if (body.media !== undefined) { // Check if media field was explicitly sent in body (can be empty array)
            if (Array.isArray(body.media)) {
                mediaUpdate = body.media;
            } else { // If it's a single path string
                mediaUpdate = [body.media];
            }
        }

        if (body.caption !== undefined) {
            post.caption = body.caption;
        }

        if (mediaUpdate !== null) {
            post.media = mediaUpdate;
        }

        if (!body.caption && !mediaUpdate && newImages.length === 0 && newVideos.length === 0) {
            return res.status(400).json({ message: "No update data provided." });
        }

        await post.save();

        res.status(200).json({success:true, post});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

exports.deletePost = async (req, res)=>{
    try{
        const post = await Post.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        if(!post){
            return res.status(404).json({message:"Not authorized or post not found!"})
        }
        post.isDeleted = true
        await post.save()

        await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: -1 } });
        
        res.status(200).json({success:true, message:"Post deleted"})

    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

exports.likeUnlikePost = async (req, res)=>{
    try {
        const postId = req.params.id;
    
        // Get user info from token (NOT from body)
        const userId = req.user._id.toString();
        const username = req.user.name;
        const userpic = req.user.userpic || ""; // Use empty string if userpic is not available
    
        // Find the post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
    
        // Check if user already liked the post
        const alreadyLiked = post.like.some(
          (item) => item.userId === userId
        );
    
        if (!alreadyLiked) {
          // LIKE
          await post.updateOne({
            $push: {
              like: {
                userId,
                username,
                userpic
              }
            },
            $inc: { likesCount: 1 }
          });
    
          return res.status(200).json({ message: "Post liked" });
        }

        // UNLIKE
        await post.updateOne({
          $pull: { like: { userId: userId } },
          $inc: { likesCount: -1 }
        });
    
        return res.status(200).json({ message: "Post unliked" });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.createComment = async (req, res)=>{
    try {
        const postId = req.params.id;
        let { text } = req.body;
        // Get user info from token
        const userId = req.user._id;
        const username = req.user.name;
        const userpic = req.user.userpic || "";
        // Find the post
        const post = await Post.findById(postId);

        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            userId,
            username,
            userpic,
            text
        };

        await post.updateOne({
            $push: { comments: newComment },
            $inc: { commentCount: 1 }
        });

        return res.status(201).json({ message: "Comment added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.editComment = async (req, res)=>{
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { text } = req.body;

        const userId = req.user._id.toString();

        const post = await Post.findById(postId);
        
        if(!post){
            return res.status(404).json({message:"Post not found!"});
        }
        
        const commentIndex = post.comments.findIndex(
            (comment) => comment._id.toString() === commentId && comment.userId.toString() === userId
        );

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found or user not authorized" });
        }

        post.comments[commentIndex].text = text;
        post.comments[commentIndex].createdAt = Date.now();

        await post.save();

        return res.status(200).json({ message: "Comment updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteComment = async (req, res)=>{
    try {
        const postId = req.params.id
        const commentId = req.params.commentId
        const userId = req.user._id.toString()

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"Post not found!"})
        }

        const comment = post.comments.some(
            (comnt)=>comnt._id.toString() === commentId && comnt.userId.toString() === userId
        );

        if(!comment){
            return res.status(404).json({ message: "Comment not found or user not authorized" });
        }
        
        await post.updateOne({
            $pull:{ comments:{ userId: userId}},
            $inc:{ commentCount: -1}
        })

    return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// Get User Post by querry parameter
exports.getUserPost = async(req, res)=>{
    try {
        const {userid, postid} = req.query
        var condition = { isDeleted: false }
        if(postid){
            condition._id = postid;
        } else if(userid){
            condition['user'] = userid
        }

        const posts = await Post.find(condition)
                                .populate('user', 'name profilePic') // Populate user details
                                .sort({ createdAt: -1 });
        
        if (!posts.length) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// Get Liked Posts
exports.likedPost = async (req, res)=>{
    try {
        const postId = req.query.postid
        const userId = req.user._id
        if(!postId){
            return res.status(400).send("Please enter user")
        }

        var userlike = await Post.exists({
            _id: postId,
            "like.userId":userId
        })
        if(!userlike){
            return res.status(404).json({success:false})
        }
        return res.status(200).json({success:true})
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal server error")
    }
}

// Get User Post Version 1 all post and liekd by liked flag
exports.getlikedpostV1 = async(req, res)=>{
    try {
        const currentUserId = req.user._id

        const posts = await Post.find({ isDeleted: false })
            .populate('user', 'name profilePic')
            .sort({ createdAt: -1 })
            .lean();

        if (!posts.length) {
            return res.status(404).json({ success: false, message: "No posts found" });
        }

        // Add liked flag based on the logged-in user
        const updatedPosts = posts.map(post => {
            const liked = post.like?.some(item => item.userId === currentUserId) || false;
            return {
                ...post,
                liked
            };
        });

        res.status(201).json({
            success: true,
            posts: updatedPosts
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Report User
exports.reportpost = async (req, res)=>{
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(204).json({message:"Post not found!"})
        }
        post.isReported = true
        post.save()
        return res.status(201).json({mssage:"Report Submitted!!"})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
