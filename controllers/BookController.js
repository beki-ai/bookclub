const Book = require('../models/Book');
const User = require('../models/User');

// Créer un nouveau livre
exports.createBook = async (req, res) => {
    const { title, description } = req.body;

    // Validation des données pour les livres
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Le titre est requis.' });
    }
    if (!description || description.length < 5) {
        return res.status(400).json({ message: 'La description doit contenir au moins 5 caractères.' });
    }

    try {
        const newBook = new Book({
            title,
            description,
            creator: req.user.id, // L'ID de l'utilisateur connecté
        });
        await newBook.save();

        // Ajouter automatiquement le livre aux favoris de l'utilisateur
        const user = await User.findById(req.user.id);
        if (user) {
            user.favorites.push(newBook._id);
            await user.save();
        }

        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('creator', 'username');

        // Vérifier si chaque livre est favori de l'utilisateur connecté
        const user = await User.findById(req.user.id);
        const booksWithFavorites = books.map((book) => {
            const isFavorite = user.favorites.includes(book._id);
            return { ...book._doc, isFavorite };
        });

        res.status(200).json(booksWithFavorites);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer un livre spécifique
exports.getBookDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id).populate('creator', 'username');
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        const user = await User.findById(req.user.id);
        const isFavorite = user.favorites.includes(book._id);

        res.status(200).json({ ...book._doc, isFavorite });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier un livre (accessible uniquement à l'utilisateur qui l'a ajouté)
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validation des données pour les modifications
    if (title && title.trim() === '') {
        return res.status(400).json({ message: 'Le titre ne peut pas être vide.' });
    }
    if (description && description.length < 5) {
        return res.status(400).json({ message: 'La description doit contenir au moins 5 caractères.' });
    }

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        // Vérifier si l'utilisateur est le créateur
        if (book.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        // Mettre à jour les informations
        book.title = title || book.title;
        book.description = description || book.description;

        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un livre (accessible uniquement à l'utilisateur qui l'a ajouté)
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        // Vérifier si l'utilisateur est le créateur
        if (book.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        await book.remove();

        // Retirer le livre des favoris des utilisateurs
        const users = await User.updateMany(
            { favorites: book._id },
            { $pull: { favorites: book._id } }
        );

        res.status(200).json({ message: 'Livre supprimé' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
