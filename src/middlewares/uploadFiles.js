import multer from 'multer'

/* const uploadFiles = (req, res, next) => {
  console.log('entrando al uploadFiles')
  console.log(req.file)
  if (req.file) {
    return res.send({
      status: false,
      message: 'No file uploaded',
    })
  } else {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    })
    const upload = multer({ storage }).single('avatar')

    next()
  }
}

export default uploadFiles */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

export const upload = multer({ storage })
