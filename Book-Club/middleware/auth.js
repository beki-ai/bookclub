const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    // Récupérer le token du header Authorization
    const token = req.headers['authorization'];

    // Vérifier que le token est bien présent
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
    }

    // Supprimer le préfixe "Bearer " du token
    const tokenWithoutBearer = token.split(' ')[1];

    try {
        // Vérifier le token avec la clé secrète
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        // Chercher l'utilisateur dans la base de données
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Ajouter les informations de l'utilisateur à la requête
        req.user = user;

        // Passer à la prochaine étape de la requête
        next();
    } catch (error) {
        // En cas d'erreur, retourner une réponse 403 pour token invalide ou expiré
        return res.status(403).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authenticateToken;
