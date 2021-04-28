const Record = require("../models/Record");

//add a record
module.exports.addRecord = async (categoryId, amount, description, userId) => {
  if (!categoryId) {
    throw new Error("Category ID is missing.");
  }

  if (!amount) {
    throw new Error("Amount missing.");
  }

  if (!description) {
    throw new Error("Description is missing.");
  }

  const record = new Record({
    categoryId,
    amount,
    description,
    userId,
  });

  const createdRecord = await record.save();
  return createdRecord;
};

//get/list all records
module.exports.getRecords = async (userId) => {
  if (!userId) {
    throw new Error("User ID is missing.");
  }

  const records = await Record.find({ userId });
  return records;
};

//retrieve a specific record
// module.exports.getRecord = async (userId) => {

//     if (!userId) {
//         throw new Error('User ID is missing.')
//     }

//     const record = await Category.findById({userId});
//     return record;
// }

//update a record
module.exports.updateRecord = async (
  recordId,
  categoryId,
  amount,
  description,
  createdOn
) => {
  const updates = {};

  if (categoryId) {
    updates.categoryId = categoryId;
  }

  if (amount) {
    updates.amount = amount;
  }

  if (description) {
    updates.description = description;
  }

  if (createdOn) {
    updates.createdOn = createdOn;
  }

  const record = Record.findByIdAndUpdate(recordId, updates);
  return record;
};

//delete a record
module.exports.deleteRecord = async (userId, recordId) => {
  const record = await Record.findOne({ _id: recordId });

  if (!record) {
    throw new Error("Record not found.");
  }

  if (record.userId !== userId) {
    throw new Error("Record not found.");
  }

  await record.delete();
};
