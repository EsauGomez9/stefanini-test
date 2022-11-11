import multer from 'multer'
import path from 'path'
import mimeTypes from 'mime-types'
import { Request } from 'express'

type FileNameCb = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../uploads/temp/'),
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCb
  ): void => {
    const FILE_EX: string = String(mimeTypes.extension(file.mimetype) ?? '')
    if (FILE_EX === 'csv') {
      // saving temp file
      callback(null, `${Date.now()}_${file.originalname}`)
    } else {
      callback(Error.arguments, '')
    }
  }
})

const upload = multer({ storage })

export default upload
