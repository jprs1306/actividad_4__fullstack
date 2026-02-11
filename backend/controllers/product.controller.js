const Product = require('../models/product.model');

// 1. Crear un nuevo producto (CREATE)
const createProduct = async (req, res) => {
    try {
        // Creamos una instancia del modelo con los datos que vienen del frontend
        const newProduct = new Product(req.body);
        
        // Guardamos en la base de datos
        const savedProduct = await newProduct.save();
        
        // Respondemos con el producto creado y código 201 (Created)
        res.status(201).json(savedProduct);
    } catch (error) {
        // Si hay error (ej: falta el precio), respondemos con código 400
        res.status(400).json({ message: error.message });
    }
};

// 2. Obtener todos los productos (READ)
const getProducts = async (req, res) => {
    try {
        // .find() sin argumentos devuelve todo
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... (código anterior de createProduct y getProducts) ...

// 3. Actualizar un producto (UPDATE)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de la URL
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Borrar un producto (DELETE)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ¡Importante! Actualiza el exports al final del archivo:
module.exports = {
    createProduct,
    getProducts,
    updateProduct, // Nuevo
    deleteProduct  // Nuevo
};