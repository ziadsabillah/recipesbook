const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    photo_url: {type: String},
    duration: {type: Number, required: true}
}, {
    timestamps: true
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;