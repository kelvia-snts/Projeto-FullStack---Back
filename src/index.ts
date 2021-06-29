import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
import { AddressInfo } from "net";
import { musicRouter } from "./routes/musicRouter";
import { userRouter } from "./routes/userRouter";

app.use(express.json());

app.use("/users", userRouter);
app.use("/music", musicRouter)





const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run the server.`);
  }
});
