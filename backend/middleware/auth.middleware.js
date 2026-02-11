const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Buscamos el token en la cabecera 'Authorization'
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        // 2. Verificamos si el token es real usando nuestra clave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Si es real, guardamos los datos del usuario en la petición (req.user)
        req.user = verified;
        
        // 4. ¡Pase adelante! Continuamos con la siguiente función (next)
        next();
    } catch (error) {
        res.status(400).json({ message: "Token no válido." });
    }
};

module.exports = verifyToken;