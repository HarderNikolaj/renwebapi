import express from "express";
import memberModel, { IMemberModel } from "../Models/memberModel";
import middleware from "../Middleware/middleware";

const middle = new middleware();
const membersRouter = express.Router();

membersRouter.route('')
.get((req,res) => {
    memberModel.find(async (err, documents) => {
        (err) ? res.send(err) : res.send(documents);
    });
})
.post(async (req, res) =>{
    var user: IMemberModel = new memberModel(req.body);
    user.save((err, product) => {
        (err) ? res.send(err) : res.send(product);
    });
})
.delete((req, res) => {
    memberModel.deleteMany({}, (err) => {
        (err) ? res.send(err) : res.json({ 'success': true }) 
    });
});


membersRouter.use(middle.authenticate)
membersRouter.route('/:email')
.get((req,res) => {
    memberModel.find({ 'email': req.params.email }, (err, documents) => {
        (err) ? res.send(err) : res.send(documents);
    });
})
.delete((req, res) => {
    memberModel.deleteOne({'email': req.params.email}, (err) => {
       (err) ? res.send(err) : res.json({'success': true}); 
    });
})
.patch((req, res) => {
    var user: IMemberModel = new memberModel(req.body);
    memberModel.updateOne({ "email": req.params.email}, user, (err, result)=>{
        (err) ? res.send(err) : res.send(result);
    });
})

export default  membersRouter;