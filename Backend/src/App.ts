// ========== imports =========
import ConfigDev from "../config-dev.json";
import ConfigProd from "../config-prod.json";
import express from "express";
import mongoose from "mongoose";

global.config =
  global.process.env.NODE_ENV === "production" ? ConfigDev : ConfigProd;

// ========= const used variables =========
const app = express();

// ========= starting the backend server =========
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Listening on " + PORT + " ..."));

// Connect once to MongoDB To access the data in the Database:
mongoose
  .connect(global.config.database.connectionString)
  .then((db) => console.log("We're connected to MongoDB"))
  .catch((err) => console.log(err));
