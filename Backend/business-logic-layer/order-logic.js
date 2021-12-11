const OrderModel = require("../models/order.model");
const itemLogic = require("../business-logic-layer/item-logic");

function getAllOrdersAsync() {
    return OrderModel.find().exec();
}
async function getOrderByIdAsync(_id) {
    const order = await OrderModel.findById({ _id }).populate("cart").exec();
    const items = await itemLogic.getAllItemsByCartIdAsync(order.cartId);
    let finalPrice = 0;
    for (const item of items) {
        finalPrice += item.totalPrice;
    }
    order.finalPrice = finalPrice;
    return order;
}
function addOrderAsync(order) {
    return order.save();
}
function removeOrderAsync(_id) {
    return OrderModel.findByIdAndRemove(_id).exec();
}

module.exports = {
    getOrderByIdAsync,
    addOrderAsync,
    removeOrderAsync,
    getAllOrdersAsync,
};