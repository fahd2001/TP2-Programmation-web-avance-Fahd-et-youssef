const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ouvragesRoutes = require("./routes/ouvrages.routes");
const authRoutes = require("./routes/auth.routes");   // <-- AJOUT

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ouvrages", ouvragesRoutes);
app.use("/api/auth", authRoutes);  // <-- AJOUT ✔

app.get("/", (req, res) => {
    res.send("API livresgourmands.net opérationnelle ✔");
});

const PORT = process.env.PORT || 3000;

// Mount payment routes before starting the server so errors show up at startup
const paymentRoutes = require("./routes/payment.routes");
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
    console.log("🔥 API en marche sur le port " + PORT);
});


