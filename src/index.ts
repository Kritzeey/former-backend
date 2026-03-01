import express from "express";
import { errorHandler } from "./presentation/middlewares/error-handler.middleware";
import authRoutes from "./presentation/routes/auth.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
