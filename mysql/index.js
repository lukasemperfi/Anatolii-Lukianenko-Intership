import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import { getAvgUsersAge } from "./utils/dbHelpers.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const avg = await getAvgUsersAge();

  res.send(avg);
});

app.listen(PORT, () => console.log(`server started on ${PORT}`));
