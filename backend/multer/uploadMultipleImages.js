const multer = require('multer')
const path = require('path');
const {fileFilter} = require('./multer.config');


const getFileStorage = () => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'images') {
                cb(null, 'uploads/images/multimage/');
            } else {
                cb(new Error('Invalid file field'), null);
            } 
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
};


const postFiletypes = /jpeg|jpg|png/;

const uploadMultimages = multer({
    storage: getFileStorage(),
    limits:{ fileSize: 70 * 1024 * 1024 }, // 70MB limit
    fileFilter: fileFilter(postFiletypes)
}).fields([
    {name: 'mulimage', maxCount: 15}
]); 