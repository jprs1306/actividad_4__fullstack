const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');

describe('Pruebas de Productos', () => {

  // Prueba 1: Verificar que podemos obtener productos
  it('Debería obtener la lista de productos (GET /)', async () => {
    const res = await request(app).get('/api/products');
    
    // Esperamos que el código sea 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Esperamos recibir un array (una lista)
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
