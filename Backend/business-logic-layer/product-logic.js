const ProductModel = require('../models/product.model');



function getAllProductsAsync() {
    return ProductModel.find().populate("categories").exec();
}
// select * from products where name like ___
function getProductsByRegexAsync(pattern) {
    return ProductModel.find({ name: { $regex: pattern } }).populate("categories").exec();
}

function getOneProductAsync(_id) { 
    return ProductModel.findById(_id).exec();
}

function addProductAsync(product) {
    return product.save(); 
}

function updateProductAsync(product) {
    return ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
}

function deleteProductAsync(_id) {
    return ProductModel.findByIdAndRemove(_id).exec();
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
    getProductsByRegexAsync,
}