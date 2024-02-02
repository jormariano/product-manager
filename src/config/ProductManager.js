import { promises as fs } from 'fs';
import crypto from 'crypto';

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    // Se lee la ruta que enviaron
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    return prods;
  }

  async getProductById(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const prod = prods.find((product) => product.id === id);
    if (prod) return prod;
    else return 'El producto no existe';
  }
  async addProduct(newProduct) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));

    if (
      newProduct.code &&
      newProduct.id &&
      newProduct.title &&
      newProduct.description &&
      newProduct.price &&
      newProduct.thumbnail &&
      newProduct.code &&
      newProduct.stock
    ) {
      // Se agregan las validaciones
      if (!newProduct.id) {
        newProduct.id = crypto.randomBytes(10).toString('hex');
      }

      const index = prods.findIndex((prod) => prod.code === newProduct.code);

      if (index === -1) {
        prods.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(prods));
        return 'Producto creado exitosamente';
      } else {
        return 'El producto ya existe';
      }
    } else {
      return 'Ingrese un producto';
    }
  }

  async updateProduct(id, newProductUp) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const index = prods.findIndex((product) => product.id === id);

    if (index != -1) {
      // Actualizar solo los campos que tienen valores no nulos en newProductUp
      Object.keys(newProductUp).forEach((key) => {
        if (newProductUp[key] !== null && newProductUp[key] !== undefined) {
          prods[index][key] = newProductUp[key];
        }
      });
      await fs.writeFile(this.path, JSON.stringify(prods));
      return 'El producto fue actualizado correctamente';
    } else {
      return 'El producto no existe';
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const index = prods.findIndex((product) => product.id === id);
    if (index != -1) {
      const prodsFiltered = prods.filter((prod) => prod.id != id);
      await fs.writeFile(this.path, JSON.stringify(prodsFiltered));
      return 'El producto fue eliminado correctamente';
    } else {
      return 'El producto no existe';
    }
  }
}
