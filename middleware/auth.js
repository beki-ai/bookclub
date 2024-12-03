const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        req.user = user; // Ajouter les infos utilisateur à la requête
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authenticateToken;
