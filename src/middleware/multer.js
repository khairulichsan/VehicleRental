const { request, response } = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./uploads/')
    },
    filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)        
    }
})

const fileFilter = (request, file, callback)=>{
console.log(file);
if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
    callback(null,true)
}else{
    return callback(new Error('Extension must be JPG or PNG'), false)
}
}

const limits = {fileSize: 1024 * 1024 * 1}

let upload = multer({storage, fileFilter, limits}).single( 'image')

const uploadFilter = (request, response, next)=>{
    upload(request,request, function (err) {
        if (err instanceof multer.MulterError) {
            response.status(400).send({
                success: false,
                message: err.message
            })
        }else if (err) {
            response.status(400).send({
                success: false,
                message: err.message
            })
        }
        next()
    })
}

module.exports = uploadFilter