// Paso 1: npm init --yes
// Paso 2: "type": "module",
// Paso 3: crear carpetas src y dentro config, data y rutes
// Paso 4: npm i express
// Paso 5: node --watch src/index.js
// Paso 6: crear .gitignore y escribir node_modules

import express from 'express';
import { ProductManager } from './config/ProductManager.js';

const app = express();
const PORT = 8000;

const productManager = new ProductManager('./src/data/products.json');

app.get('/', (req, res) => {
  res.send('Creando mi primer servidor en Express Js');
});

app.get('/productos', async (req, res) => {
  // limit entre {} porque puede existir mas de un elemento para buscar
  const { limit } = req.query;

  const prods = await productManager.getProducts();

  // el metodo slice() dice que dado un num de inicio y un num de fin que puede ser indefinido, devuelve una porcion del array
  // el valor inicial siempre es 0
  const prodsLimit = prods.slice(0, limit);

  res.send(prodsLimit);
});

app.get('/productos/:pid', async (req, res) => {
  // todo dato que se consulta desde un parametro es un string, si e sun numero hay que parsearlo
  const idProducto = req.params.pid;

  const prod = await productManager.getProductById(idProducto);

  res.send(prod);
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
