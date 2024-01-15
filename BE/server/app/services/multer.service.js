const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Route xử lý upload ảnh
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }
    res.send('Image uploaded successfully.');
});
