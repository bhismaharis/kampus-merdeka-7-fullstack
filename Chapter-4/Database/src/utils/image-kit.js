const ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Image upload function to ImageKit
exports.imageUpload = async (file) => {
    const uploadedFile = await imagekit.upload({
        file: file.data,
        fileName: file.name,
    });
    return uploadedFile?.url;
};