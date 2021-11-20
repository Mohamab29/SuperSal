// ========== imports =========
global.config =
    global.process.env.NODE_ENV === "production" ? require("./config-prod.json") : require("./config-dev.json");
require("./data-access-layer/dal");
const cors = require("cors");
const express = require('express');
const authController = require("./controllers/auth-controller");

// ========= const used variables =========
const app = express();

// ========= starting the backend server =========
app.use(cors())
app.use(express.json());

// controllers
app.use("/api/auth",authController);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Listening on " + PORT + " ..."));

