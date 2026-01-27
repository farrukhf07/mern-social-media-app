const multer = require('multer');
const path = require('path');
const { getFileStorage, fileFilter } = require('./multer.config');

const postFiletypes = /jpeg|jpg|png|gif|mp4|mov|avi|wmv/;
let images =/jpeg|jpg|png|gif/

const uploadMedia = multer({
    storage:getFileStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: fileFilter(postFiletypes)
}).fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]);

module.exports = uploadMedia;