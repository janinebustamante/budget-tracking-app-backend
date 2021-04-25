const express = require('express');
const router = express.Router();
const auth = require('../auth');
const UserController = require('../controllers/users');



//register user
router.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const user = await UserController.register(firstName, lastName, email, password);
        res.json(user)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
    // res.send(await UserController.register(req.body));
})

//login user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const accessToken = await UserController.login(email, password);
        res.json({accessToken});
    } catch (err) {
        res.status(500).json({err: err.message});
    }
    // res.send(await UserController.login(req.body));
})


//google login verification
router.post('/verify-google-id-token', async (req, res) => {
    res.send(await UserController.verifyGoogleTokenId(req.body.tokenId))
})


//retrieve details of user
router.get('/details', auth.verify, async (req, res) => {
    const user = auth.decode(req.headers.authorization)

    try {
        const userDetails = await UserController.getUserDetails({userId: user.id}) //changed user.id to user._id
        res.json(userDetails);
    } catch (err) {
        res.status(500).json({err: err.message});
    }

})


//update details of user
router.put('/details', auth.verify, async (req, res) => {
    const user = auth.decode(req.headers.authorization);
    // console.log(user.id)
    const userId = user.id
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await UserController.updateUserDetails(userId, firstName, lastName, email, password)
        res.json({success: true});
    } catch (err) {
        res.status(500).json({err: err.message});
    }
})



module.exports = router;