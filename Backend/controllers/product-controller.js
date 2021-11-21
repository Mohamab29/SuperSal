const express = require("express");
const productLogic = require("../business-logic-layer/product-logic");
const ProductModel = require("../models/product.model");
const errorsHelper = require("../helpers/errors-helper");
const verifyLogin = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const router = express.Router();

// */api/products
router.use(verifyLogin);

router.get("/", async (request, response) => {
    try {
        const products = await productLogic.getAllProductsAsync();
        response.json(products);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

//GET product by id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productLogic.getOneProductAsync(_id);
        if (!product) return response.status(404).send(`_id ${_id} not found`);
        response.json(product);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

router.post("/", verifyAdmin, async (request, response) => {
    try {
        const product = new ProductModel(request.body);

        // Validate: 
        const errors = await product.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));

        const addedProduct = await productLogic.addProductAsync(product);
        response.status(201).json(addedProduct);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

router.patch("/:_id", verifyAdmin, async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;

        const product = new ProductModel(request.body);

        const updatedProduct = await productLogic.updateProductAsync(product);
        if (!updatedProduct) return response.status(404).send(`_id ${_id} not found`);
        
        response.json(updatedProduct);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

router.delete("/:_id", verifyAdmin, async (request, response) => {
    try {
        const _id = request.params._id;

        const deletedProduct = await productLogic.deleteProductAsync(_id);
        if (!deletedProduct) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

module.exports = router;
