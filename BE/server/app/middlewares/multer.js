const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            let { desPathUpload, discount, email, pictureSearch } = req.body;
            if (discount) {
                desPathUpload = '/product';
            }
            if (pictureSearch) {
                desPathUpload = '/search';
            }
            if (email) {
                desPathUpload = '/user';
            }
            if (!discount && !email && !pictureSearch) {
                desPathUpload = '/brand';
            }
            if (desPathUpload) {
                cb(null, path.join(__dirname, `../store/img${desPathUpload}`)); // Using path.join() for file paths
            }
        } catch (error) {
            console.log(error);
        }
    },
    filename: function (req, file, cb) {
        let end = file.originalname.split('.');
        cb(null, +Date.now() + '.' + end[end.length - 1]);
    },
});

// Create the Multer middleware
const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
