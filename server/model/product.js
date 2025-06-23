const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    recipe: { type: String, required: true },
    nutritionValue: {
        energy: { type: Number, required: true },
        fat: { type: Number, required: true },
        protein: { type: Number, required: true },
        carbohydrates: { type: Number, required: true },
        sugar: { type: Number, required: true }
    },
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);