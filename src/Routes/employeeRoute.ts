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
employeesRouter.route('/:email')
.get((req,res) => {
    employeeModel.find({ 'email': req.params.email }, (err, documents) => {
        (err) ? res.send(err) : res.send(documents);
    });
})
.delete((req, res) => {
    employeeModel.deleteOne({'email': req.params.email}, (err) => {
       (err) ? res.send(err) : res.json({'success': true}); 
    });
})
.patch((req, res) => {
    var user: IEmployeeModel = new employeeModel(req.body);
    employeeModel.updateOne({ "email": req.params.email}, user, (err, result)=>{
        (err) ? res.send(err) : res.send(result);
    });
})

export default  employeesRouter;