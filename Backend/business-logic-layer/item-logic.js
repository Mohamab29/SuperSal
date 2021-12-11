const ItemModel = require("../models/item.model");

async function getAllItemsByCartIdAsync(cartId) {
    const items = await ItemModel.find({ cartId: cartId }).populate("product").exec();
    for (const item of items) {
        item.totalPrice = item.product.price * item.quantity;
    }
    return items;
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