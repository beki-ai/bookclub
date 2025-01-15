const express = require('express');
const { createBook, getAllBooks, getBookDetails, updateBook, deleteBook } = require('../controllers/BookController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, createBook); // Ajouter un livre
router.get('/', getAllBooks); // Lister tous les livres
router.get('/:id', getBookDetails); // Détails d'un livre
router.put('/:id', authenticateToken, updateBook); // Modifier un livre
router.delete('/:id', authenticateToken, deleteBook); // Supprimer un livre

module.exports = router;