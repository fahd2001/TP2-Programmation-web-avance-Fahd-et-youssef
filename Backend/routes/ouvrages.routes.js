const express = require("express");
const router = express.Router();
const controller = require("../controllers/ouvrages.controller");

// Routes
router.get("/", controller.getOuvrages);
router.get("/:id", controller.getOuvrage);

module.exports = router;


