const router = require('express').Router();
const UserTypesModel = require('../model/UserTypes');

//Method To Render User Types Page
router.get('/', async(req, res, next)=>{
    res.render('userTypes/index');
});

//Method To Create New User Type
router.post('/', async(req, res)=>{
    try {
        let newUserType = req.body;

        newUserType = await new UserTypesModel(newUserType).save();
        
        return res.status(201).send({userType: newUserType});
    } catch (err) {
        return res.send(err.message).status(500);
    }
});

//Method To Get All Data
router.get('/getAll', async(req, res)=>{
    try {
        let userTypes = await UserTypesModel.find();
        return res.send({userTypes: userTypes})
    } catch (err) {
        return res.send(err.message).status(500);
    }
});

//Method To Edit User Type
router.put('/:userId', async(req, res)=>{
    try {
        let userType = req.body;

        userType = await UserTypesModel.findByIdAndUpdate(req.params.userId, {$set: userType}, {new: true});

        return res.status(201).send({userType: userType});
    } catch (err) {
        return res.send(err.message).status(500);
    }
});

//Method To Delete User Type
router.delete('/:userId', async(req, res)=>{
    try {
        await UserTypesModel.findByIdAndDelete(req.params.userId);
        return res.sendStatus(200);
    } catch (err) {
        return res.send(err.message).status(500);
    }
})

module.exports = router;