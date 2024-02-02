// Paso 1: npm init --yes
// Paso 2: "type": "module",
// Paso 3: crear carpetas src y dentro config, data y rutes
// Paso 4: npm i express
// Paso 5: node --watch src/index.js
// Paso 6: crear .gitignore y escribir node_modules

import express from 'express';
import { Product } from './config/Product.js';
import { ProductManager } from './config/ProductManager.js';

const app = express();
const PORT = 8000;

const productManager = new ProductManager('./src/data/products.json');

app.get('/', (req, res) => {
  res.send('Creando mi primer servidor en Express Js');
});

app.get('/products', async (req, res) => {
  // limit entre {} porque puede existir mas de un elemento para buscar. http://localhost:8000/products?limit=2
  const { limit } = req.query;

  const prods = await productManager.getProducts();

  /* el metodo slice() se utiliza para extraer una porción de un array y devolverla como un nuevo array.
  No modifica el array original, devuelve un nuevo array que contiene los elementos seleccionados. 
  Acepta dos parámetros, inicio y fin (puede ser undefined), para indicar los índices desde y hasta los cuales extraer los elementos.
  El valor inicial siempre es 0 
  Si se envia cualquier caracter, que no sea un num, lo toma como si fuera 0 y devuelve array vacio [] 
  Para resolver esto, utilizamos el metodo parseInt porque su funcion es convertir una cadena (string) en un número entero 
  Al parsear un string no numerico, devuelve NaN
  */

  const limits = parseInt(limit);

  if (limits) {
    if (limits < 0) {
      res.send('Escribe un valor valido para devolver');
    } else {
      const prodsLimit = prods.slice(0, limit);

      res.send(prodsLimit);
    }
  } else {
    res.send('Escribe un valor valido');
  }
});

app.get('/products/:pid', async (req, res) => {
  // todo dato que se consulta desde un parametro es un string, si es un numero hay que parsearlo
  const idProducto = req.params.pid;

  const prod = await productManager.getProductById(idProducto);

  res.send(prod);

  //La opcion de retornar que el producto no existe esta creada en el metodo en ProducstManager, no es necesario repetirla
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

/* Probar de crear nuevos productos 

const product3 = new Product('Carrie', 'Libro de terror', 8000, 8, 'C123');
productManager.addProduct(product3);

const product4 = new Product('1Q84', 'Libro de Murakami', 10000, 18, 'Q123');
productManager.addProduct(product4);

*/
