const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require('mongoose');

const url = 'http://172.16.3.228:5000'

// Get User
exports.getuser = async (req, res)=>{
    try {
        userId = req.body.id || req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// Update Own Profile
exports.updateProfile = async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found or Un Authorized"});
        }

        const body = req.body || {};
        const uploadedFile = req.file;

        let profilePicUpdate = null;
        if (uploadedFile) {
            profilePicUpdate = `${url+`/`+uploadedFile.path}`;
        } 
        else if (body.profilePic !== undefined) {
            profilePicUpdate = body.profilePic;
        }

        // Check if any update data is provided
        if (body.name === undefined && body.password === undefined && profilePicUpdate === null) {
            return res.status(400).json({ message: "No update data provided." });
        }

        if (body.name !== undefined) {
            user.name = body.name;
        }

        if (body.password !== undefined) {
            user.password = body.password; // Saving password as plain text as requested
        }

        if (profilePicUpdate !== null) {
            user.profilePic = profilePicUpdate;
        }

        await user.save();

        res.status(200).json({success:true, message:"Profile updated successfully!", user});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:error.message});
    }
}

// Follow Unfollow User
exports.follow = async(req, res)=>{
    try {
        const userAId = req.user._id; // User A is the current logged-in user
        const userBId = req.params.id; // User B is the user to be followed/unfollowed

        // Prevent a user from following themselves
        if (userAId.toString() === userBId.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }
        const userA = await User.findById(userAId);
        const userB = await User.findById(userBId);
        if (!userA || !userB) {
            return res.status(404).json({ message: "User not found." });
        }

        const userBObjectId = new mongoose.Types.ObjectId(userBId);
        const isFollowing = userA.following.some(item => new mongoose.Types.ObjectId(item.userId).equals(userBObjectId));

        if (isFollowing) {
            // Unfollow User B
            await User.findByIdAndUpdate(userAId, {
                $pull: { following: { userId: userBId } },
                $inc: { followingCount: -1 }
            });
            await User.findByIdAndUpdate(userBId, {
                $pull: { followers: { userId: new mongoose.Types.ObjectId(userAId) } },
                $inc: { followersCount: -1 }
            });
            return res.status(200).json({ message: `Unfollowed ${userB.name}` });
        } else {
            // Follow User B
            await User.findByIdAndUpdate(userAId, {
                $push: { 
                    following: {
                        userId: userBId,
                        username: userB.name,
                        userpic: userB.profilePic
                    }
                },
                $inc: { followingCount: 1 }
            });
            await User.findByIdAndUpdate(userBId, {
                $push: {
                    followers: {
                        userId: userAId,
                        username: userA.name,
                        userpic: userA.profilePic
                    }
                },
                $inc: { followersCount: 1 }
            });
            return res.status(201).json({message: `Following ${userB.name}`})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

// Get FollowedUser
exports.getfollowedUser = async(req, res)=>{
    try {
        const userId = req.query.userid
        
        var followedUser = await User.exists({
            "following.userId": userId
        })
        if(!followedUser){
            return res.status(404).json({success:false, message:`You are not following this user `})
        }
        return res.status(200).json({success:true})
    } catch (error) {
        console.error(error)
        return res.status(500).message("Internal server error")
    }
}

// Get following user from the list of users.
exports.getAllFollowUserV1 = async (req, res)=>{
    try {
        const currentUserId = req.user._id.toString();

        // Get all users except current user
        const users = await User.find({ _id: { $ne: currentUserId } })
            .select("name profilePic followers")
            .lean();

        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        const updatedUsers = users.map(user => {
            const isFollowing = user.followers?.some(
                follower => follower.userId === currentUserId
            ) || false;

            return {
                _id: user._id,
                name: user.name,
                profilePic: user.profilePic,
                isFollowing
            };
        });

        res.status(200).json({
            success: true,
            users: updatedUsers
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Delete User Account
exports.deleteUserAccount = async (req, res)=>{
    try {  
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
          }
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(204).json({ message: "User not found!" });
        }
        // Remove user from following array
        await User.updateMany(
            { "following.userId": userId.toString() },
            { $pull: { following: { userId: userId.toString() } }, $inc: { followingCount: -1 } }
        );
        // Remove user from follower array
        await User.updateMany(
            { "followers.userId": userId.toString() },
            { $pull: { followers: {userId: userId.toString() }}, $inc: { followersCount: -1 }}
        );
        // Remove Like form all post
        await Post.updateMany(
            { "like.userId": userId.toString() },
            { $pull: {like: {userId: userId.toString() }}, $inc: { likesCount: -1}}
        );
        // Remove Comments from all posts
        await Post.updateMany(
            { "comments.userId": userId.toString() },
            { $pull: {comments: {userId: userId.toString() }}, $inc: {commentCount: -1}}
        );
        // Delete All posts by this user
        await Post.deleteMany({user: userId});
        // Delete current User
        await User.findByIdAndDelete(userId);

        return res.status(202).json({status:true, message:"Account Deleted Sucessfully!"})
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error!")
    }
}