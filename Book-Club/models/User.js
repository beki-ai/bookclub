const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    timestamps: true, // Ajoute automatiquement `createdAt` et `updatedAt`
});


// Middleware pour hacher le mot de passe avant 
// de sauvegarder l'utiliseur 

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password,salt);
    next();
});

//methode pour comparer les mots de passe
userSchema.methods.matchPassword =async function(enterPassword) {
    return await bcrypt.compare(enterPassword,this.password);
};

const user = mongoose.model('user',userSchema);
module.exports=user;
