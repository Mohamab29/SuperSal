const mongoose = require('mongoose');

// item in cart
const ItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing product id"]
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "missing cart id"]
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "minimum one item of the product in a cart"],
        max: [99, "maximum one item of the product in a cart"],
    },
    totalPrice: {
        type: Number,
        default: 0,
        min: [0, "price can't be negative"],
        max: [11000, "maximum price you can pay is 11000"],
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
});

ItemSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});
ItemSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const ItemModel = mongoose.model("ItemModel", ItemSchema, "items");

module.exports = ItemModel;