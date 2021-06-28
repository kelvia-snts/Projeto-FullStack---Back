import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
import { AddressInfo } from "net";

app.use(express.json());

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run the server.`);
  }
});
