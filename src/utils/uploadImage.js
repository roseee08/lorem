const { storage } = require('../configs/firebase');
const { getDownloadURL } = require('firebase-admin/storage');

// Function to handle image upload
const uploadImage = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const timestamp = Date.now(); // Get current timestamp
  const fileName = `${timestamp}_${file.originalname}`; // Append timestamp to filename
  const bucket = storage.bucket();
  const newImageRef = bucket.file(`fotoPeliharaan/${fileName}`);

  // Upload the file to the storage bucket
  await newImageRef.save(file.buffer);

  // Get the download URL
  const downloadURL = await newImageRef.getSignedUrl({
    action: 'read',
    expires: '03-09-2491', // Expiration date far in the future
  });

  return downloadURL[0]; // getSignedUrl returns an array with the URL as the first element
};

const deleteImage = async (imageURL) => {
  try {
    if (!imageURL) {
      throw new Error('No image URL provided');
    }

    const bucket = storage.bucket();

    // Extract the file path from the URL
    const urlParts = imageURL.split('?')[0].split('/');
    const filePath = urlParts[urlParts.length - 1];

    const imageRef = bucket.file(`fotoPeliharaan/${filePath}`);

    // Check if the file exists before attempting deletion
    const exists = await imageRef.exists();

    if (!exists[0]) {
      throw new Error('Image does not exist');
    }

    await imageRef.delete();
    console.log(`Image deleted: ${imageURL}`);
  } catch (error) {
    console.error('Error deleting image:', error.message);
    throw error; // Propagate the error for handling at a higher level if needed
  }
};



module.exports = { uploadImage, deleteImage };
