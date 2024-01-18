import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import storage from '../config/firebase.js'
import sharp from 'sharp'

async function uploadFile (file, nameFolder) {
  const fileBuffer = await sharp(file.buffer).resize({ width: 220, height: 330, fit: 'contain' }).toBuffer()

  const fileRef = ref(storage, `${nameFolder}/${file.originalname} ${Date.now()}`)

  const fileMetaData = {
    contentType: file.mimetype
  }

  const fileUploadPromise = uploadBytesResumable(
    fileRef,
    fileBuffer,
    fileMetaData
  )

  await fileUploadPromise

  const fileDownloadURL = await getDownloadURL(fileRef)

  return { ref: fileRef, downloadURL: fileDownloadURL }
}

export default uploadFile
