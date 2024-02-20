// Multer es un middleware de terceros para realizar carga de archivos al servidor
// Instalar multer en Clase 8 - 1h 27' en la Terminal: npm i multer

import multer from 'multer';
import { __dirname } from '../path.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/img`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
