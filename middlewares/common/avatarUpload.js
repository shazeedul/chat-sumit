function avatarUpload(req, res, next)
{
    // if (req.file) {
    //     req.body.avatar = `/uploads/avatars/${req.file.filename}`;
    // }
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, .jpeg or .png format allowed!"
    );
    next();
}

module.exports = avatarUpload;