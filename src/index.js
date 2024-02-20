// Paso 1: npm init --yes
// Paso 2: "type": "module",
// Paso 3: crear carpetas src y dentro config, data y rutes
// Paso 4: npm i express
// Paso 5: node --watch src/index.js
// Paso 6: crear .gitignore y escribir node_modules
// Paso 7: Handlebars como motor de plantilla Clase 9 - 16'
// Paso 8: npm i socket.io - Clase 10- 57'

// Creamos un CRUD: Create Read Update Delete

import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import upload from './config/multer.js';
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';

// Configuraciones
const app = express();
const PORT = 8080;

// Server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const io = new Server(server);

// Middlewares: intermediario que se ejecuta antes de llegar al endpoint
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Establezco conexion entre servidor y cliente
io.on('connection', (socket) => {
  console.log('Conexion con Socket.io');

  // cuando el cliente envia un mensaje, lo capturo y lo muestro en la consola
  socket.on('message', (info) => {
    console.log(info);
  });

  socket.on('finish', (info) => {
    console.log(info);
    // Se envia "respuesta" al mensaje del cliente
    socket.emit('client-message', 'Finalizo la consulta');
    // A todas las conexiones establecidas con el servidor se les envia este mensaje, pero no me llega a mi que lo envie
    socket.broadcast.emit(
      'finish-message',
      'Finalizo la comunicacion con el cliente'
    );
  });
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

// Se agrega el middleware entre la ruta y el contenido de la ruta
app.post('/upload', upload.single('product'), (req, res) => {
  try {
    console.log(req.file);
    res.status(200).send('Imagen cargada correctamente');
  } catch (e) {
    res.status(500).send('Error al cargar imagen');
  }
});
app.get('/static', (req, res) => {
  const listProducts = [
    {
      id: 1,
      title: 'Novela de Terror',
      price: 1500,
      img: './img/It-Stephen-King.jpg',
    },
    {
      id: 2,
      title: 'Novela de Fantasía',
      price: 2000,
      img: './img/FuegoySangre-GeorgeMartin.jpg',
    },
    {
      id: 3,
      title: 'Novela de Misterio',
      price: 2500,
      img: 'https://hips.hearstapps.com/hmg-prod/images/81kl15rzqel-1660754131.jpg',
    },
  ];

  res.render('templates/products', {
    showProducts: true,
    products: listProducts,
    css: 'products.css',
  });
});
