const multer = require('multer');
const path = require('path');
const { fileFilter } = require('./multer.config');

const getFileStorage = () => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'profilePic') {
                cb(null, 'uploads/images/profile/');
            } else {
                cb(new Error('Invalid file field'), null);
            } 
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
};

const profileFiletypes = /jpeg|jpg|png|gif/;

const profileUpload = multer({
    storage: getFileStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: fileFilter(profileFiletypes)
}).single('profilePic');

module.exports = profileUpload;