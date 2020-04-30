import mongoose, { Schema, Document} from "mongoose";


mongoose.connect('mongodb://localhost:27017/employees', { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useCreateIndex: true });

export const employeeSchema = new Schema({
    email: 
    {
        type: "string",
        required: true,
        unique: true
    },
    firstname:
    {
        type: "string",
        required: true
    },
    lastname:
    {
        type: "string",
        required: true
    },
    password:
    {
        type: "string",
        required: true
    },
    jobtitle:
    {
        type: "string",
        required: false
    },
    roleHumanResource:
    {
        type: "boolean",
        required: true,
        default: false
    },roleSupport:
    {
        type: "boolean",
        required: true,
        default: false
    },roleAdministrator:
    {
        type: "boolean",
        required: true,
        default: false
    },

});

interface IEmployee{
    email : string;
    firstname : string;
    lastname : string;
    password : string;
    jobtitle : string;
    roleHumanResource : boolean;
    roleSupport : boolean;
    roleAdministrator : boolean;
}

export interface IEmployeeModel extends Document, IEmployee{

}

var EmployeeModel = mongoose.model<IEmployeeModel>('Employee',employeeSchema);
export default EmployeeModel;