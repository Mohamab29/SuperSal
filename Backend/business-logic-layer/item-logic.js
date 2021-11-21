const ItemModel = require("../models/item.model");

function getAllItemsByCartIdAsync(cartId) {
    return ItemModel.find({ cartId: cartId }).populate("product").exec();
}

async function addItemAsync(item) {
    return item.save();
}

function updateItemAsync(item) {
    return ItemModel.findByIdAndUpdate(item._id, item, { returnOriginal: false }).exec();
}

function removeItemAsync(_id) {
    return ItemModel.findByIdAndRemove(_id).exec();
}




module.exports = {
    getAllItemsByCartIdAsync,
    addItemAsync,
    removeItemAsync,
    updateItemAsync,
}