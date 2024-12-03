const Favorite = require('../models/Favorite');
const Book = require('../models/Book');
const User = require('../models/User');

// Ajouter un livre aux favoris
exports.addFavorite = async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        // Vérifier si le livre est déjà dans les favoris de l'utilisateur
        const existingFavorite = await Favorite.findOne({
            user: req.user.id,
            book: bookId,
        });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Livre déjà favori' });
        }

        const newFavorite = new Favorite({
            user: req.user.id,
            book: bookId,
        });

        await newFavorite.save();
        res.status(201).json({ message: 'Livre ajouté aux favoris' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retirer un livre des favoris
exports.removeFavorite = async (req, res) => {
    const { bookId } = req.params;

    try {
        const favorite = await Favorite.findOneAndDelete({
            user: req.user.id,
            book: bookId,
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Livre non trouvé dans vos favoris' });
        }

        res.status(200).json({ message: 'Livre retiré des favoris' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer tous les favoris d'un utilisateur
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id }).populate('book');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
