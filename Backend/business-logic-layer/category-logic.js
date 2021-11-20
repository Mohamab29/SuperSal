const CategoryModel = require('../models/category.model');

// since there is only two functions 
function getAllCategoriesAsync() {
    return CategoryModel.find({}).populate("products").exec();
}

function addCategoryAsync(category) {
    return category.save();
}

module.exports = {
    getAllCategoriesAsync,
    addCategoryAsync
}