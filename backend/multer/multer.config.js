const multer = require('multer');
const path = require('path');

const getFileStorage = () => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'images') {
                cb(null, 'uploads/images/post/');
            } else if (file.fieldname === 'videos') {
                cb(null, 'uploads/videos/post/');
            } else {
                cb(new Error('Invalid file field'), null);
            } 
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
};

const fileFilter = (allowedFiletypes) => {
    return function (req, file, cb) {
        const mimetype = allowedFiletypes.test(file.mimetype);
        const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type!'), false);
        }
    };
};

module.exports = {
    getFileStorage,
    fileFilter
};