import express from "express";
import membersRouter from "./Routes/memberRoute";
import loginRouter from "./Routes/loginRoute";
import bodyParser from "body-parser";
import middleware from './Middleware/middleware'

const middle = new middleware();


const app = express();
app.use(bodyParser.json());

app.use('/members/login/', loginRouter);

app.use(middle.hash, middle.getUser);
app.use('/members/', membersRouter);

const Port = process.env.Port || 3000;

app.listen(Port, ()=> {
    console.log('server is running on port: ' + Port);
});