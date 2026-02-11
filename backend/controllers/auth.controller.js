const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTRAR USUARIO
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error: error.message });
    }
};

// 2. INICIAR SESIÓN (LOGIN)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Crear Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, role: user.role });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

module.exports = { register, login };