// Backend/models/auth.model.js
const pool = require("../config/db");

async function registerUser(nom, email, hashedPassword) {
    const [result] = await pool.query(
        "INSERT INTO utilisateurs (nom, email, password) VALUES (?, ?, ?)",
        [nom, email, hashedPassword]
    );
    return result.insertId;
}

async function findUserByEmail(email) {
    const [rows] = await pool.query(
        "SELECT * FROM utilisateurs WHERE email = ?",
        [email]
    );
    return rows[0];   // <-- IMPORTANT
}

module.exports = { registerUser, findUserByEmail };
