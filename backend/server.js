import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes/index.js";
import connectDB from "./db/connection.js";
import { swaggerOptions } from "./swagger/config.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

connectDB();

const specs = swaggerJSDoc(swaggerOptions);
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use("/api/v1/", router);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
