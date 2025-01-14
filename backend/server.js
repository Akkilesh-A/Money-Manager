import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes/index.js";
import connectDB from "./db/connection.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Money Manager Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

connectDB();

const specs = swaggerJSDoc(options);
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
