import express from "express";
import employeeModel, { IEmployeeModel } from "../Models/employeeModel";
import middleware from "../Middleware/middleware";

const middle = new middleware();
const employeesRouter = express.Router();

employeesRouter.route('')
.get((req,res) => {
    employeeModel.find(async (err, documents) => {
        (err) ? res.send(err) : res.send(documents);
    });
})
.post(async (req, res) =>{
    var user: IEmployeeModel = new employeeModel(req.body);
    user.save((err, product) => {
        (err) ? res.send(err) : res.send(product);
    });
})
.delete((req, res) => {
    employeeModel.deleteMany({}, (err) => {
        (err) ? res.send(err) : res.json({ 'success': true }) 
    });
});


employeesRouter.use(middle.authenticate)
employeesRouter.route('/:searchParam')
.get((req,res) => {
    let searchObjectArray : object[] = [];
    let SearchParams : string[] = req.params.searchParam.split(", ");
    
    SearchParams.forEach((value, index) => {
        const reg: RegExp = new RegExp(value);
        searchObjectArray[index] = { $or: [{ 'email': reg }, { 'firstname': reg }, { 'lastname': reg }]};
    });
    employeeModel.find({ $and: searchObjectArray }, (err, documents) => {
        (err) ? res.send(err) : res.send(documents);
    });
})
.delete((req, res) => {
    employeeModel.deleteOne({'email': req.params.searchParam}, (err) => {
       (err) ? res.send(err) : res.json({'success': true}); 
    });
})
.patch((req, res) => {
    employeeModel.updateOne({ "email": req.params.searchParam}, req.body, (err, result)=>{
        (err) ? res.send(err) : res.send(result);
    });
})

export default  employeesRouter;