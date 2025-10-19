const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file, fileName){
    const result = await imagekit.upload({
        // buffer is used to upload the file to Imagekit.
        file: file, 
        // fileName is used to name the file in Imagekit.
        fileName: fileName,
    })
    return result;
}

module.exports = { uploadFile };