import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import router from "./routes.js";
import path from "path";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//Cookie Parser
app.use(cookieParser());

// CORS Policy
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Load routes
app.use(router);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});