const express = require('express');
const router = express.Router();
const Controller = require('../controller/post.controller');
const auth = require('../middleware/fetchbearuser');
const controllerUploadMedia = require('../multer/upload.middleware');
const uploadMedia = require('../multer/upload.middleware');

// Route1: Create Posts using POST "/api/posts/createPosts". lOGIN REQUIRED.
router.post(
    '/createPosts',
    auth,
    controllerUploadMedia,
    Controller.createPost
);

// Route2: Fetcg All Posts using GET "/api/posts/getAllPost".
router.get(
    '/getAllPosts',
    Controller.getAllPosts
);

// Route3: Fetch Posts by id using GET "/api/posts/:id".
router.get(
    '/getpost',
    Controller.getPost
);

// Route4: Update Posts by id using PUT "/api/posts/:id".
router.put(
    '/updatePosts/:id',
    auth,
    uploadMedia,
    Controller.updatePost
);

// Route5: Delete Posts by id using DELETE "/api/posts/:id".
router.put(
    '/deletePosts/:id',
    auth,
    Controller.deletePost
);


// Route6: Like/Unlike Posts by id using PUT "/api/posts/:id/like".
router.put(
    '/:id/like',
    auth,
    Controller.likeUnlikePost
)

// Route7: Create a comment on Post by id using PUT "/api/posts/:id/comment"
router.put(
    '/:id/comment',
    auth,
    Controller.createComment
)

// Route8: Edit a comment on Post by id using PUT "/api/posts/:id/comment/:commentId"
router.put(
    '/:id/comment/:commentId',
    auth,
    Controller.editComment
)

// Route8: Delete a comment on Post by id using DELETE "/api/posts/:id/comment/:commentId"
router.delete(
    '/:id/comment/:commentId',
    auth,
    Controller.deleteComment
)

// Route9: GetUserPost using: GET "/api/posts/getuserpost". Login required
router.get(
    '/getuserpost',
    auth,
    Controller.getUserPost
)

// Route10: GetLikedPost using: GET "/api/posts/getlikedpost". Login required
router.get(
    '/getlikedpost',
    auth,
    Controller.likedPost
)

// Route11: GetLikedPost of specific user using: GET "/api/posts/getlikedpostV1". Login required
router.get(
    '/getlikedpostV1',
    auth,
    Controller.getlikedpostV1
)

// Route12: reportPost using: PATCH "/api/posts/reportpost/:id". Login required
router.patch(
    '/reportpost/:id',
    Controller.reportpost
)

module.exports = router