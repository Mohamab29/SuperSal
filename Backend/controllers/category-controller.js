const express = require("express");
const categoryLogic = require("../business-logic-layer/category-logic");
const errorsHelper = require("../helpers/errors-helper");
const CategoryModel = require("../models/category.model");
const verifyLogin = require("../middleware/verify-logged-in");
const router = express.Router();

// */api/categories 
router.use(verifyLogin);

router.get('/', async (request, response) => {
    try {

        const categories = await categoryLogic.getAllCategoriesAsync();
        response.json(categories);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});


router.post("/", async (request, response) => {
    try {
        // Model
        const category = new CategoryModel(request.body);

        //validate
        const errors = await category.validateSync();
        if (errors) return response.status(400).send(errorsHelper.mongooseError(errors));

        const addedCategory = await categoryLogic.addCategoryAsync(category);
        // success
        response.status(201).json(addedCategory);

    } catch (error) {
        errorsHelper.internalServerError(response, error);

    }
});
module.exports = router;