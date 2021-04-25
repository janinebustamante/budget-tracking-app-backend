const express = require('express');
const CategoryController = require('../controllers/categories');
const auth = require('../auth');
const router = express.Router();


//add a category name
router.post('/', auth.verify, async (req, res) => {
    const { categoryName, categoryType } = req.body;
    const token = req.headers.authorization;
    const payload = auth.decode(token);
    const userId = payload.id;

    try {
        const category = await CategoryController.addCategory(userId, categoryName, categoryType)
        res.json(category)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


//get/list all categories
router.get('/', auth.verify, async (req, res) => {
    const token = req.headers.authorization;
    const payload = auth.decode(token);
    const userId = payload.id;

    try {
        const categories = await CategoryController.getCategories(userId)
        res.json(categories);
    } catch (err) {
        res.status(500).json({err: err.message});
    }
})


//update a category
router.put('/:categoryId', auth.verify, async (req, res) => {
    const categoryId = req.params.categoryId
    const { categoryName } = req.body

    try {
        const category = await CategoryController.updateCategory(categoryId, categoryName)
        res.json({success: true});
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


//delete a category
router.delete('/:categoryId', auth.verify, async (req, res) => {
    const categoryId = req.params.categoryId;

    const token = req.headers.authorization;
    const payload = auth.decode(token);
    const userId = payload.id;

    try {
        await CategoryController.deleteCategory(userId, categoryId)
        res.json({success: true});
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})



module.exports = router;