const express = require('express')
const router = express.Router()
const uploadPic = require('../multer/profileUpload.middleware')
var fetchbearuser = require('../middleware/fetchbearuser');
const Controller = require('../controller/user.controller')

// Route1: Get loggedin User Details usin: POST "/api/user/getuser". Login required
router.post(
    '/getuser', 
    fetchbearuser,
    Controller.getuser
);

// Route2: Update user using: PUT "/api/user/updateuser". Login required
router.put(
    '/updateuser',
    fetchbearuser,
    uploadPic,
    Controller.updateProfile
)

// Route3: Follow user using: PUT "/api/user/follow". Login required
router.put(
    '/follow/:id',
    fetchbearuser,
    Controller.follow
)

// Route3: Follow user using: PUT "/api/user/getfolloweduser". Login required
router.get(
    '/getfolloweduser',
    fetchbearuser,
    Controller.getfollowedUser
)

// Route4: Follow user using: GET "/api/user/getallfollowuserv1". Login required
router.get(
    '/getallfollowuserv1',
    fetchbearuser,
    Controller.getAllFollowUserV1
)

// Route5: Delete User user using: DELETE "/api/user/deleteaccount". Login required
router.get(
    '/deleteaccount',
    fetchbearuser,
    Controller.deleteUserAccount
)

module.exports = router