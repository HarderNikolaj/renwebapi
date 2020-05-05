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
membersRouter.route('/:searchParam')
.get((req,res) => {
    let searchObjectArray : object[] = [];
    let SearchParams : string[] = req.params.searchParam.split(", ");
    
    SearchParams.forEach((value, index) => {
        const reg: RegExp = new RegExp(value);
        searchObjectArray[index] = { $or: [{ 'email': reg }, { 'firstname': reg }, { 'lastname': reg }]};
    });
    memberModel.find({ $and: searchObjectArray }, (err, documents) => {
        (err) ? res.send(err) : res.send(documents);
    });
})
.delete((req, res) => {
    memberModel.deleteOne({'email': req.params.searchParam}, (err) => {
       (err) ? res.send(err) : res.json({'success': true}); 
    });
})
.patch((req, res) => {
    memberModel.updateOne({ "email": req.params.searchParam}, req.body, (err, result)=>{
        (err) ? res.send(err) : res.send(result);
    });
})

export default  membersRouter;