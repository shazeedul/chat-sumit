const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');


function uploader(
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
) {
    //file upload folder
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    //define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") + "-" + Date.now();

            cb(null, fileName + fileExt);
        },
    });

    //preparing the final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                // To accept the file pass `true`, like so:
                cb(null, true);
            } else {
                // To reject this file pass `false`, like so:
                cb(createHttpError(`${file.originalname} ${error_msg}`));
            }
        },
    });

    return upload;
}

module.exports = uploader;