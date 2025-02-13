import express from "express"; //framework
import productRouter from "./routers/product";

const app = express();

// Midleware
app.use(express.json());

// Router
app.use("/api", productRouter);

export const viteNodeApp = app;
