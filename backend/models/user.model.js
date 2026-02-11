const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // ¡Importante! No queremos usuarios repetidos
  },
  email: {
    type: String,
    required: true,
    unique: true // El correo también debe ser único
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Solo permitimos estos dos valores
    default: 'user' // Si no especificamos, será usuario normal por defecto
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);