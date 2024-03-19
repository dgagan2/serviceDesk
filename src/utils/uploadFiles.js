import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import storage from '../config/firebase.js';
import sharp from 'sharp';

/**
 * Uploads a file to the specified folder.
 * @param {Object} file - The file to be uploaded.
 * @param {string} nameFolder - The name of the folder where the file will be uploaded.
 */
/**
 */
async function uploadFile (file, nameFolder) {
  /**
   * Resizes the file buffer using sharp library.
   *
   * @param {Buffer} fileBuffer - The file buffer to be resized.
   * @returns {Buffer} The resized file buffer.
   */
  const fileBuffer = await sharp(file.buffer).resize({ width: 220, height: 330, fit: 'contain' }).toBuffer();

  const fileRef = ref(storage, `${nameFolder}/${file.originalname} ${Date.now()}`);

  const fileMetaData = {
    contentType: file.mimetype
  };

  const fileUploadPromise = uploadBytesResumable(
    fileRef,
    fileBuffer,
    fileMetaData
  );
  // Uploads a file to the storage and returns the reference and download URL.
  await fileUploadPromise;

  // The download URL of the file.
  const fileDownloadURL = await getDownloadURL(fileRef);

  return { ref: fileRef, downloadURL: fileDownloadURL };
}

export default uploadFile;
