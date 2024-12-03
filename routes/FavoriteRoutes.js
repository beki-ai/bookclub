const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/FavoriteController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, addFavorite); // Ajouter aux favoris
router.delete('/:bookId', authenticateToken, removeFavorite); // Retirer des favoris
router.get('/', authenticateToken, getFavorites); // Lister les favoris d'un utilisateur

module.exports = router;
  