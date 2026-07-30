const multer = require('multer');
const path = require('path');  //Node.js has built-in module called path it helps us work with file names and file extensions.

//Configure where uploaded files will be stored
const storage = multer.diskStorage({

    destination : function(req, file, cb) {
        cb(null, 'uploads/');
    },

    //This decides what the uploaded file will be named
    filename : function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//Allow only PDF, DOC and DOCX Files
const fileFilter = (req, file, cb) => {

    const allowedTypes = /pdf|doc|docx/;

    const extension = path.extname(file.originalname).toLowerCase();

    if(allowedTypes.test(extension)) {

        cb(null, true);

    } 
    
    else 
        {

        cb(new Error('Only PDF, DOC and DOCX files are allowed.'));
    }
};

const upload = multer({storage, fileFilter});   //Multer Middleware

module.exports = upload;