// ========== imports =========
global.config =
    global.process.env.NODE_ENV === "production" ? require("./config-prod.json") : require("./config-dev.json");
require("./data-access-layer/dal");
const cors = require("cors");
const express = require('express');

// ========= const used variables =========
const authController = require("./controllers/auth-controller");
const categoryController = require("./controllers/category-controller");
const imageController = require("./controllers/image-controller");
const productController = require("./controllers/product-controller");
const cartController = require("./controllers/cart-controller");
const itemController = require("./controllers/item-controller");
const orderController = require("./controllers/order-controller");


// ========= starting the backend server =========
const app = express();
app.use(cors())
app.use(express.json());

// controllers
app.use("/api/auth", authController);
app.use("/api/categories", categoryController);
app.use("/api/images", imageController);
app.use("/api/products", productController);
app.use("/api/carts", cartController);
app.use("/api/items", itemController);
app.use("/api/orders", orderController);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Listening on " + PORT + " ..."));

