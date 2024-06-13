import uploadFile from '../utils/uploadFiles.js';

/**
 * Uploads an image to a specified folder.
 * @param {Object} req - The request object.
 * @param {Object} req.files - The files object containing the image to be uploaded.
 * @param {Object} req.body - The body object containing the name of the folder to upload the image to.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the image is successfully uploaded.
 */
export const uploadImage = async (req, res) => {
  if (req.files === undefined) return res.status(400).json({ message: 'Debe cargar la imagen' });
  const { image } = req.files;
  const { nameFolder } = req.body;
  if (!nameFolder) return res.status(404).json({ message: 'Name Folder is required' });
  try {
    if (image && image.length > 0) {
      const { downloadURL } = await uploadFile(image[0], nameFolder);
      res.status(201).json(downloadURL);
    } else {
      return res.status(400).json({ message: 'Debe cargar la imagen' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};
