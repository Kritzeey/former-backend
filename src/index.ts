import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
