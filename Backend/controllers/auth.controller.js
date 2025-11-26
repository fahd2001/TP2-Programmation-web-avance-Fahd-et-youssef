const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser, findUserByEmail } = require("../models/auth.model");

exports.register = async (req, res) => {
    const { nom, email, password } = req.body;

    if (!nom || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    try {
        const existing = await findUserByEmail(email);
        if (existing) {
            return res.status(400).json({ message: "Email déjà utilisé." });
        }

        const hashed = await bcrypt.hash(password, 10);
        const userId = await registerUser(nom, email, hashed);

        res.status(201).json({ message: "Inscription réussie", userId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Générer JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            message: "Connexion réussie",
            token,
            user: {
                id: user.id,
                nom: user.nom,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.login = async (req, res) => {
    console.log("Email reçu :", req.body.email);
    console.log("Password reçu :", req.body.password);

    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        console.log("Résultat MySQL :", user);

        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        res.json({ message: "Connexion OK" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
