import express from "express"; //framework
import productRouter from "./routers/product";

const app = express();

app.use(express.json());

app.use("/api", productRouter);

export const viteNodeApp = app;
