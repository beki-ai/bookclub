const express=require ('express') ;
const cors =require('cors');
const dotenv =require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require ('./routes/UserRoutes');
const bookRoutes = require('./routes/BookRoutes');
const favoriteRoutes = require('./routes/FavoriteRoutes');


dotenv.config();
connectDB();
const app = express ();


//Middleware 

app.use(cors());// pour autoriser les requetes cross-origin
app.use(express.json()); // Pour analyser les requêtes JSON
app.use('/favorites', favoriteRoutes); 

// Routes
app.use('/api/user', authRoutes);
app.use('/api/books', bookRoutes); // Ajouter les routes des livres
app.use('/api/favorites', favoriteRoutes); // Ajouter les routes des favoris

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});