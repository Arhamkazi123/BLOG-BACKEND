import "./config.js";
import cors from "cors";
import express from "express";
const app = express();
const PORT = 9000;
import { connectdb } from "./config/db.js";
import { authrouter } from "./routes/authroute.js";

app.use(cors());
app.use(express.json());

app.use("/api/auth", authrouter);

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running ");
  });
});
