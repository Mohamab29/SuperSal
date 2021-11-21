const OrderModel = require("../models/order.model");


function getOrderById(_id){
    return OrderModel.find({_id}).populate("cart").exec();
}
function addOrderAsync(order){
    return order.save();
}
function removeOrderAsync(_id){
    return OrderModel.findByIdAndRemove(_id).exec();
}

module.exports = {
    getOrderById,
    addOrderAsync,
    removeOrderAsync,
};