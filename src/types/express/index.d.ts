import { IMemberModel } from "../../Models/memberModel";

declare namespace Express{
    interface Request{
        user?: IMemberModel
    }
}



