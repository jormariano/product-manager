// Paso 1: npm init --yes
// Paso 2: "type": "module",
// Paso 3: crear carpetas src y dentro config, data y rutes
// Paso 4: npm i express
// Paso 5: node --watch src/index.js
// Paso 6: crear .gitignore y escribir node_modules

// Creamos un CRUD: Create Read Update Delete

import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import upload from './config/multer.js';
import { __dirname } from './path.js';

// Configuraciones
const app = express();
const PORT = 8000;

// Middlewares
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

// se agrega el middleware entre la ruta y el contenido de la ruta
app.post('/upload', upload.single('product'), (req, res) => {
  try {
    console.log(req.file);
    res.status(200).send('Imagen cargada correctamente');
  } catch (e) {
    res.status(500).send('Error al cargar imagen');
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
