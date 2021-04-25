const express = require('express');
const router = express.Router();
const auth = require('../auth');
const RecordController = require('../controllers/records');


//add a record
router.post('/', auth.verify, async (req, res) => {
    const { categoryId, amount, description, createdOn } = req.body;
    const token = req.headers.authorization;
    const payload = auth.decode(token);
    const userId = payload.id;
    //createdOn??????

    try {
        const record = await RecordController.addRecord(categoryId, amount, description, createdOn, userId)
        res.json(record)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


//retrieve all records
router.get('/', auth.verify, async (req, res) => {
    const token = req.headers.authorization;
    const payload = auth.decode(token);
    const userId = payload.id;

    try {
        const records = await RecordController.getRecords(userId)
        res.json(records);
    } catch (err) {
        res.status(500).json({err: err.message});
    }
})


//retrieve a specific record
// router.get('/:recordId', auth.verify, async (req, res) => {
//     const recordId = req.params.recordId

//     try {
//         const record = await RecordController.getRecord(recordId)
//         res.json(record);
//     } catch (err) {
//         res.status(500).json({err: err.message})
//     }
// })


//update/edit a record
//how to update categories???????
router.put('/:recordId', auth.verify, async (req, res) => {
    const recordId = req.params.recordId
    const { categoryId, amount, description, createdOn } = req.body

    try {
        const record = await RecordController.updateRecord(recordId, categoryId, amount, description, createdOn)
        res.json({success: true});
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})


//delete a record
router.delete('/:recordId', auth.verify, async (req, res) => {
    const recordId = req.params.recordId;

    const token = req.headers.authorization;
    const payload = auth.decode(token);
    const userId = payload.id;

    try {
        await RecordController.deleteRecord(userId, recordId)
        res.json({success: true});
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})



module.exports = router;