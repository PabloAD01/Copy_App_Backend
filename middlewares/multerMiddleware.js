import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Guarda las imágenes en la carpeta 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Asigna un nombre único a la imagen
  },
});

const upload = multer({ storage: storage });

// Middleware para manejar la carga de múltiples imágenes
const uploadMiddleware = upload.array("images", 5); // Admite hasta 5 imágenes

export default uploadMiddleware;
