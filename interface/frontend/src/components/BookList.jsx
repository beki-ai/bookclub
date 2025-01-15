import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/Api';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Charger la liste des livres au montage du composant
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
      }
    };

    fetchBooks();
  }, []);

  // Supprimer un livre
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id)); // Mettre à jour l'état local
      alert('Livre supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  };

  // Données statiques pour les livres avec les chemins relatifs des images
  const staticBooks = [
    {
      id: 1,
      title: 'How to Stop Worrying and Start Living',
      author: 'Dale Carnegie',
      genre: 'Self-Help',
      year: 1948,
      coverImage: '/how-to.jpg', // Chemin relatif vers l'image
    },
    {
      id: 2,
      title: 'The Book of Moods',
      author: 'Lauren Martin',
      genre: 'Self-Help',
      year: 2020,
      coverImage: '/the-book-of-moods.jpg', // Chemin relatif vers l'image
    },
    {
      id: 3,
      title: 'The Diary of a CEO',
      author: 'Steven Bartlett',
      genre: 'Business',
      year: 2023,
      coverImage: '/the-diary.jpg', // Chemin relatif vers l'image
    },
    {
      id: 4,
      title: 'A Tout Jamais',
      author: 'Colleen HoOVER',
      genre: 'Romance',
      year: 2023,
      coverImage: '/a-tout-jamais.jpg', // Chemin relatif vers l'image
    },
    {
      id: 5,
      title: 'It Ends With Us ',
      author: 'Colleen Hover',
      genre: 'Romance',
      year: 2016,
      coverImage: '/it-ends.jpg', // Chemin relatif vers l'image
    },
    {
      id: 6,
      title: 'Milk and Honey',
      author: 'Rupi Kaur',
      genre: 'Poetry',
      year: 2019,
      coverImage: '/milk and honey.jpg', // Chemin relatif vers l'image
    },
  ];

  // Utiliser les données statiques si l'API ne renvoie pas de données
  const displayedBooks = books.length > 0 ? books : staticBooks;

  return (
    <div className="book-list">
      <h1>List of Books</h1>
      <div className="book-grid">
        {displayedBooks.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.coverImage} alt={book.title} className="book-image" />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p><strong>Auteur:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Année de publication:</strong> {book.year}</p>
              <button onClick={() => handleDeleteBook(book.id)} className="delete-button">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;