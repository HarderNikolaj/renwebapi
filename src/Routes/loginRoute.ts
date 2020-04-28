import express from "express";
import bcrypt from "bcrypt";
import MemberModel from "../Models/memberModel";
import util from "util";
import jwt from "jsonwebtoken";
import {secret, tokenLifespan} from "../settings.json";


const loginRouter = express.Router();


const promiseCompare = util.promisify(bcrypt.compare);

loginRouter.route('')
.post(async (req,res)=>{
    MemberModel.findOne({ "email": req.body.email }, async (err,document)=>{
        if(err) res.send(err);
        if(document){
            (await promiseCompare(req.body.password, document.password)) ? res.json(
                {
                    "success": true,
                    "email": document.email,
                    "firstname":document.firstname,
                    "lastname": document.lastname,
                    "tokenLifespan": tokenLifespan,
                    "token": jwt.sign({ "email": req.body.email }, secret, { "expiresIn": tokenLifespan })
                }
            ) : res.json(
                {
                    "success": false,
                    "error": "password didn't match"
                }); 
        }
        else{
            res.json(
                {
                    "success": false,
                    "error": "user not found"
                }); 
        }
    });
});

export default loginRouter;