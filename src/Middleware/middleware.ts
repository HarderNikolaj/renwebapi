import bcrypt from "bcrypt";
import util from 'util';
import jwt from "jsonwebtoken";
import {secret} from "../settings.json";
import memberModel, { IMemberModel } from "../Models/memberModel";


const promiseGenSalt = util.promisify(bcrypt.genSalt);
const promiseGenHash = util.promisify(bcrypt.hash);

class middleware{

    constructor(){}
    
    public async hash(req: any, res: any, next: () => void){
        if(req.body.password){
            var salt: string = await promiseGenSalt();
            req.body.password = await promiseGenHash(req.body.password, salt);
        }
        next();
    }

    public authenticate(req: any, res: any, next: () => void){
        if(req.headers.authorization){
            var token: string = req.headers.authorization;

            if(token.startsWith('Bearer ')) token = token.substring(7);
            jwt.verify(token, secret, (err)=>{
                (err) ? res.send(err) : next();
            });
        }
        else{
            res.json({
                "success": false,
                "error": "no token supplied"
            });
        }
    }

    public async getUser(req: any, res: any, next: () => void){
        var user: IMemberModel = new memberModel();
        await memberModel.findOne( {"email": req.body.email}, (err, document)=>{
            if(err) res.send(err);
            else{
                if (document) user = document;
            }
        });
        req.user = user;
        next();
    }

}
export default middleware;