const db = require("../config/db");

module.exports = {
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM ouvrages");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM ouvrages WHERE id = ?", [id]);
        return rows[0];
    }
};

