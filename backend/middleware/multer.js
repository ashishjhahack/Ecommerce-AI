import multer from 'multer';

const storage = multer.diskStorage({    // using multer for file uploads
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

export default upload;