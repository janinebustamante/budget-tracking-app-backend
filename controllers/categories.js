const Category = require('../models/Category');


//add category name
module.exports.addCategory = async (userId, categoryName, categoryType) => {

    if (!userId) {
        throw new Error('User ID is missing.')
    }

    if (!categoryName) {
        throw new Error('Category name is missing.')
    }

    if (!categoryType) {
        throw new Error('Category type is missing.')
    }

    const category = new Category({
        userId,
        categoryName,
        categoryType
    })

    const createdCategory = await category.save();
    return createdCategory;
}


//get/list all categories of user
module.exports.getCategories = async (userId) => {

    if (!userId) {
        throw new Error('User ID is missing.')
    }

    const categories = await Category.find({ userId });
    return categories;
}


//get specific category


//update a category
module.exports.updateCategory = async (categoryId, categoryName) => {   

    const updates = {}
    if (categoryName) {
        updates.categoryName = categoryName
    }

    const category = Category.findByIdAndUpdate(categoryId, updates);
    return category;
}


//delete a category
module.exports.deleteCategory = async (userId, categoryId) => {
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
        throw new Error('Category not found.')
    }

    if (category.userId !== userId) {
        throw new Error('Category not found.')
    }

    await category.delete();
}