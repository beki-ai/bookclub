const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validations pour l'inscription
    if (!firstName || firstName.length < 2) {
        return res.status(400).json({ message: 'Le prénom doit contenir au moins 2 caractères.' });
    }
    if (!lastName || lastName.length < 2) {
        return res.status(400).json({ message: 'Le nom de famille doit contenir au moins 2 caractères.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "L'adresse e-mail n'est pas valide." });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
    }

    try {
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Connexion d'un utilisateur existant
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validations pour la connexion
    if (!email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

        // Génération d'un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};