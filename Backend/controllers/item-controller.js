const express = require("express");
const itemLogic = require("../business-logic-layer/item-logic");
const errorsHelper = require("../helpers/errors-helper");
const ItemModel = require("../models/item.model");
const verifyLogin = require("../middleware/verify-logged-in");
const router = express.Router();

router.use(verifyLogin);

// GET all items by cart id
router.get("/:cartId", async (request, response) => {
    try {
        const cartId = request.params.cartId;

        const items = await itemLogic.getAllItemsByCartIdAsync(cartId);
        if (!items) return response.status(400).send("No items were found that belong to this cart " + cartId + ".");

        response.json(items);
    } catch (error) {
        errorsHelper.internalServerError(request, error);
    }
});

//POST item
router.post("/", async (request, response) => {
    try {
        // Model
        const item = new ItemModel(request.body);

        //validate
        const errors = await item.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));

        const addedItem = await itemLogic.addItemAsync(item);
        // success
        response.status(201).json(addedItem);

    } catch (error) {
        errorsHelper.internalServerError(response, error);

    }
});

//Update item
router.patch("/", async (request, response) => {
    try {
        // Model
        const item = new ItemModel(request.body);

        //validate
        const errors = await item.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));

        const updatedItem = await itemLogic.updateItemAsync(item);
        if (!updatedItem) return response.status(404).send("item with given id was not found.");
        // success
        response.json(updatedItem);

    } catch (error) {
        errorsHelper.internalServerError(response, error);

    }
});

router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;

        const deletedItem = await itemLogic.removeItemAsync(_id);
        if (!deletedItem) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

module.exports = router;