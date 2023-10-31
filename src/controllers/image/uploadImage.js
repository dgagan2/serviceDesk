import uploadFile from '../../utils/uploadFiles.js'

export const uploadImage = async (req, res) => {
  const { image } = req.files
  const { nameFolder } = req.body
  if (!nameFolder) return res.status(404).json({ message: 'Name Folder is required' })
  try {
    if (image && image.length > 0) {
      const { downloadURL } = await uploadFile(image[0], nameFolder)
      res.status(201).json(downloadURL)
    } else {
      return res.status(400).json({ message: 'Debe cargar la imagen' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}
