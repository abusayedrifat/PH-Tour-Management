import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";


const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUpload,
    params: {
        public_id: (req, file) => {

            const fileName = file.originalname
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/\./g, "-")
                .replace(/[^a-zA-Z0-9\s]/g, "")
                .trim()

            const extension = file.originalname.split(".").pop()

            const uniqueFileName = Math.floor(Math.random()* 0x10000000000000)
                .toString(16)
                .padStart(13, "0")+"-"+Date.now()+"-"+fileName+"-"+extension
        return uniqueFileName
            }
    }
})

export const multerUpload = multer({
    storage: storage
})

// console.log(storage);
// console.log(multerUpload);

