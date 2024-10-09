const ImageKit = require("imagekit-javascript");

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Image upload function to ImageKit
exports.imageUpload = async (file) => {
    const uploadFile = await imagekit.upload({
        file: file.name,
        fileName: file.data,
    });
    return uploadFile?.url;
};