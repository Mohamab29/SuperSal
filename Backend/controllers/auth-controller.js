const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();
const CredentialsModel = require("../models/credential.model");
const UserModel = require("../models/user.model");
const jwt = require("../helpers/crypto-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");

//POST Login : */api/auth/login
router.post('/login', async (request, response) => {
    try {
        // create model
        const credentials = new CredentialsModel(request.body);

        // Validation: 
        const errors = credentials.validateLogin();
        if (errors) return response.status(400).send(errors);

        // Logic: 
        const result = await authLogic.checkCredentialsAsync(credentials);
        if (typeof result === 'string') return response.status(401).send(result); // email or password are invalid
        result._doc.token = jwt.getNewToken(result);


        // Success: 
        response.json(result);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});


// POST Register : */api/auth/register 
router.post("/register", async (request, response) => {
    try {
        // Data and model: 
        const user = new UserModel(request.body);

        // Validation: 
        const errors = await user.validateSync();
        if (errors) return response.status(400).send(errors);


        // Logic: 
        const addedUser = await authLogic.addUserAsync(user);
        addedUser._doc.token = jwt.getNewToken(addedUser);

        // Success: 
        response.status(201).json(addedUser);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

router.get('/is-logged-in', verifyLoggedIn, async (request, response) => {});

module.exports = router;