const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "category ID required"],
    },

    name: {
        type: String,
        required: [true, "Product name required"]
    },

    price: {
        type: Number,
        required: [true, "Product price required"],
        min: [0, 'Minimum price is zero'],
        max: [1000, 'max price is 1000']
    },
 
    imageName: String

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

ProductSchema.virtual("categories", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;