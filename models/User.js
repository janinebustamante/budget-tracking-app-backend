const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Firstname is required.']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        // required: [true, 'Password is required']
    },
    loginType: {
        type: String,
        required: [true, 'Login type is required.']
    }
})

module.exports = mongoose.model('user', userSchema);



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: [true, 'Firstname is required.']
//     },
//     lastName: {
//         type: String,
//         required: [true, 'Lastname is required.']
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required.']
//     },
//     password: {
//         type: String,
//         // required: [true, 'Password is required']
//     },
//     loginType: {
//         type: String,
//         required: [true, 'Login type is required.']
//     },
//     category: [
//         {
//             income: {
//                 records: [
//                     {
//                         categoryType: {
//                             type: String,
//                             default: 'income'
//                         },
//                         categoryName: {
//                             type: String,
//                             required: [true, 'Category name is required']
//                         },
//                         amount: {
//                             type: Number,
//                             required: [true, 'Amount is required']
//                         },
//                         description: {
//                             type: String,
//                             required: [true, 'Description is required']
//                         },
//                         createdOn: {
//                             type: Date,
//                             default: new Date()
//                         }
//                     }
//                 ]
//             }
//         },
//         {
//             expense: {
//                 records: [
//                     {
//                         categoryType: {
//                             type: String,
//                             default: 'income'
//                         },
//                         categoryName: {
//                             type: String,
//                             required: [true, 'Category name is required']
//                         },
//                         amount: {
//                             type: Number,
//                             required: [true, 'Amount is required']
//                         },
//                         description: {
//                             type: String,
//                             required: [true, 'Description is required']
//                         },
//                         createdOn: {
//                             type: Date,
//                             default: new Date()
//                         }
//                     }
//                 ]
//             }
//         }
//     ]
// })

// module.exports = mongoose.model('user', userSchema);