import express from "express";
import { errorHandler } from "./presentation/middlewares/error-handler.middleware";
import authRoutes from "./presentation/routes/auth.routes";
import formsRoutes from "./presentation/routes/forms.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

app.use("/api/auth", authRoutes);

app.use("/api/forms", formsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running");
});
