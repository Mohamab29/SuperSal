const CartModel = require("../models/cart.model");

function getCartByIdAsync(_id) {
    return CartModel.findById(_id).exec();
}
function getCartByUserIdAsync(userId) {
    return CartModel.find({ userId }).exec();
}
function getCartByUserIdAndStatusAsync(userId, status) {
    return CartModel.find({ userId, status }).exec();
}
function getCartByUserIdAndLatestCartAsync(userId) {
    return CartModel.find({ userId }).sort({ createdAt: -1 }).limit(1).exec();
};
function addCartAsync(cart) {
    return cart.save();
}
function updateCartAsync(cart) {
    return CartModel.findByIdAndUpdate(cart._id, cart, { returnOriginal: false }).exec();
}

module.exports = {
    getCartByIdAsync,
    getCartByUserIdAsync,
    addCartAsync,
    updateCartAsync,
    getCartByUserIdAndStatusAsync,
    getCartByUserIdAndLatestCartAsync,

}