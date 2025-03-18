const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const http = require("http");


require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");


const server = http.createServer(app);

app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully!");
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port 2000...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected." + err);
  });