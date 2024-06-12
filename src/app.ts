import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundError from "./app/middlewares/notFoundError";


const app: Application = express();

app.use(express.json());
app.use(cors());

//application route
app.use('/api',router);

//not found error handler
app.use(notFoundError)

app.get("/", (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});



export default app;
