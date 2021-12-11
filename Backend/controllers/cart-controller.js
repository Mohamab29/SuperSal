const express = require("express");
const cartLogic = require("../business-logic-layer/cart-logic");
const errorsHelper = require("../helpers/errors-helper");
const CartModel = require("../models/cart.model");
const verifyLogin = require("../middleware/verify-logged-in");
const router = express.Router();

router.use(verifyLogin);

//GET cart by id
router.get('/:_id', async (request, response) => {
    try {
        const _id = request.params._id;

        const cart = await cartLogic.getCartByIdAsync(_id);
        response.json(cart);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});
//GET cart by userId
router.get('/get-by-user-id/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;
        const status = request.query.status;
        const latest = request.query.latest;
        let cart;
        if (status) {
            cart = await cartLogic.getCartByUserIdAndStatusAsync(userId, status);
        } else if (latest === 'true') {
            cart = await cartLogic.getCartByUserIdAndLatestCartAsync(userId);
        } else {
            cart = await cartLogic.getCartByUserIdAsync(userId);
        }

        response.json(cart);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});
//POST cart
router.post('/', async (request, response) => {
    try {
        const cart = new CartModel(request.body);

        const errors = await cart.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));

        const addedCart = await cartLogic.addCartAsync(cart);

        response.status(201).json(addedCart);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});
//Update cart
router.patch('/', async (request, response) => {
    try {
        const cart = new CartModel(request.body);

        const errors = await cart.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));
        
        const updatedCart = await cartLogic.updateCartAsync(cart);
        if (!updatedCart) return response.status(404).send("cart was not found");

        response.status(201).json(updatedCart);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

module.exports = router;