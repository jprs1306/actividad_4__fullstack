# Proyecto Full Stack - Gestión de Inventario 

Este proyecto es una aplicación web completa (MERN Stack) que permite gestionar un inventario de productos. Incluye autenticación de usuarios, operaciones CRUD y despliegue en la nube.

## 🚀 Tecnologías Utilizadas
- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB Atlas (Cloud)
- **Frontend:** HTML5, CSS3 (Bootstrap), JavaScript Vanilla
- **Testing:** Jest, Supertest
- **Despliegue:** Render
- **CI/CD:** GitHub Actions

## 📋 Requisitos Previos
- Node.js instalado (v14 o superior).
- Cuenta en MongoDB Atlas (para la base de datos).

## ⚙️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jprs1306/actividad_4__fullstack
   cd actividad 4


2. **Instalar dependencias:**
npm install

3.**Configurar Variables de Entorno: Crea un archivo .env en la raíz con lo siguiente:**

PORT=5000
MONGODB_URI=tu_string_de_conexion_mongo
JWT_SECRET=tu_clave

4.**Ejecutar el Servidor:**

# Modo desarrollo
npm start
El servidor iniciará en http://localhost:5000.

5.**Ejecutar Pruebas (Testing)**
El proyecto incluye pruebas automatizadas para validar los endpoints de la API.
npm test

