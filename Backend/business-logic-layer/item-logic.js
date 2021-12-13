const ItemModel = require("../models/item.model");

function calculateTotalPrice(items) {
    
    for (const item of items) {
        item.totalPrice = item.product.price * item.quantity;
    }
    return items;
}
async function getAllItemsByCartIdAsync(cartId) {
    const items = await ItemModel.find({ cartId: cartId }).populate('product').exec();
    return calculateTotalPrice(items);
}

function clearItemsByCartIdAsync(cartId) {
    return ItemModel.deleteMany({ cartId: cartId });
}

async function addItemAsync(item) {
    return item.save();
}

async function updateItemAsync(item) {
    const updatedItem = await ItemModel.findByIdAndUpdate(item._id, item, { returnOriginal: false }).populate('product').exec();
    if (updatedItem) {
        updatedItem.totalPrice = item.product.price * item.quantity
        return updatedItem;
    }
    return;
}

function removeItemAsync(_id) {
    return ItemModel.findByIdAndRemove(_id).exec();
}




module.exports = {
    getAllItemsByCartIdAsync,
    addItemAsync,
    removeItemAsync,
    updateItemAsync,
    clearItemsByCartIdAsync,
}