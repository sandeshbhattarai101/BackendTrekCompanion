const multer = require("multer")



const storage = multer.diskStorage({
    destination : function(req, file, cb){  //cb = callback function / cb(error, success)
        
        //check if the mimetype of file
        const allowedFileType = ['image/png', 'image/jpg','image/jpeg']
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("This filetype is not supported"))
            return
        }

        cb(null,'./uploads')  // error= null, success vayo vane upoads ma jaa vaneko
    },
    filename : function(req, file, cb){
        cb(null, Date.now() +"-"+ file.originalname) //date rakhnu ko karan unique banauna ho filename same huna sakxa
    }
})

module.exports = {
    multer, 
    storage
} 