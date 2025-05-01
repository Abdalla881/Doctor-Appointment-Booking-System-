import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import morgan from "morgan";
import cros from "cors";

// app config
const app = express();
const port = 4000;
connectDB();
connectCloudinary();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));

// middlewares
app.use(express.json());
app.use(cors());

// api end point
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Api working...");
});

const server = app.listen(port, () => {
  console.log(`server run on port http://localhost:${port}`);
});
