const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Référence à l'utilisateur qui a ajouté le livre
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }
);

// Mettre à jour la date à chaque modification
bookSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
