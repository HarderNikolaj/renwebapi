import mongoose, { Schema, Document} from "mongoose";
import { database } from "../settings.json";

const dbPath: string = database + '/members';
mongoose.connect(dbPath, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useCreateIndex: true })
.catch(()=>console.log("Could not connect to database - " + dbPath));

export const memberSchema = new Schema({
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
    }
});

interface IMember{
    email : string;
    firstname : string;
    lastname : string;
    password : string;
}

export interface IMemberModel extends Document, IMember{

}

var MemberModel = mongoose.model<IMemberModel>('Member',memberSchema);
export default MemberModel;