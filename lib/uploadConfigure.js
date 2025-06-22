import multer from 'multer'
import path from 'node:path'

//definiendo configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const route = path.join(import.meta.dirname, '..', 'public', 'photos')
        cb(null, route) //le pasamos un posible error (null, no debería haber) y la ruta que acabamos de crear
    }, 
    filename: function(req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({ storage })

export default upload