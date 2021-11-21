const express = require("express");
const orderLogic = require("../business-logic-layer/order-logic");
const errorsHelper = require("../helpers/errors-helper");
const OrderModel = require("../models/order.model");
const verifyLogin = require("../middleware/verify-logged-in");
const router = express.Router();

router.use(verifyLogin);

// GET order by id
router.get('/:_id', async (request, response) => {
    try {
        const _id = request.params._id;

        const order = await orderLogic.getOrderById(_id);
        if (!order) return response.status(401).send("Order was not found");

        response.json(order);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// POST an order
router.post("/", async (request, response) => {
    try {
        // Model
        const order = new OrderModel(request.body);

        //validate
        const errors = await order.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));

        const addedOrder = await orderLogic.addOrderAsync(order);

        // success
        response.status(201).json(addedOrder);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;

        const deletedOrder = await orderLogic.removeOrderAsync(_id);
        if (!deletedOrder) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});
module.exports = router;
