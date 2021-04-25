const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({  
    categoryType: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'Category type is required']
    },
    categoryName: {
        type: String,
        required: [true, 'Category name is required']
    },
    userId: {
        type: String,
        required: [true, 'User ID is required.']
    }
})

module.exports = mongoose.model('category', categorySchema);