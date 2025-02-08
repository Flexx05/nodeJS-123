import express from "express"; //framework

const app = express();

app.use(express.json());

export const viteNodeApp = app;
