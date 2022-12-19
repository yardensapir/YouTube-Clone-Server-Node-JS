import express from "express";
import { connectToDataBase, disconnectFromDataBase } from "./database/database";
import logger from "./utils/logger";
import enviorments from "./config/enviorments";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_ORIGIN } from "./constants/constants";
import helmet from "helmet";
import userRoute from "./routers/user.route";
import authRoute from "./routers/auth.router";
import videoRouter from "./routers/video.route";
import deserializeUser from "./middlewares/deserializeUser";

const PORT = enviorments.PORT || 4000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

// Routers
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRouter);

const server = app.listen(PORT, async () => {
  // Connect to Data Base
  await connectToDataBase();
  logger.info(`server is listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

const shoutdownServer = (signal: string) => {
  process.on(signal, async () => {
    server.close();

    // Disconnect from the Data Base
    await disconnectFromDataBase();
    logger.info("Goodbye From Server");
    process.exit(0);
  });
};

for (let i = 0; i < signals.length; i++) {
  shoutdownServer(signals[i]);
}
