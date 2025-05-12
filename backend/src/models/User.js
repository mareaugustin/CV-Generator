// Modèle utilisateur
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    match: /^[a-zA-Z]{2}(?!.*__)[a-zA-Z0-9_]*[a-zA-Z0-9]$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  }
}, { timestamps: true });

// Validation personnalisée pour la confirmation du mot de passe
userSchema.pre('validate', function(next) {
  if (this.isModified('password') && this._password2 !== undefined) {
    if (this.password !== this._password2) {
      this.invalidate('password2', 'Les mots de passe ne correspondent pas');
    }
  }
  next();
});

// Hash du mot de passe avant la sauvegarde
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Méthode virtuelle pour gérer password2
userSchema.virtual('password2')
  .get(function() {
    return this._password2;
  })
  .set(function(value) {
    this._password2 = value;
  });

module.exports = mongoose.model('User', userSchema);