const Ouvrage = require("../models/ouvrage.model");

exports.getOuvrages = async (req, res) => {
    try {
        const data = await Ouvrage.getAll();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getOuvrage = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Ouvrage.getById(id);

        if (!data) {
            return res.status(404).json({ error: "Ouvrage introuvable" });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};



