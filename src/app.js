
// configuración del servidor

import express, { json } from 'express';
import morgan from 'morgan';

const path = require('path');   
const multer = require('multer');
import { v4 as uuidv4 } from 'uuid';
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());

// como se almacenan los archivos
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) =>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

// nombre original y tamaño
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if(mimetype && extname){
            return cb(null, true);
        }

        // si el archivo no coincide
        cb("error: archivo debe ser una imagen válida");
    }
}).single('image'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// importing the routes
import Image from './routes/image.route';

// routes
app.use(Image);

export default app;