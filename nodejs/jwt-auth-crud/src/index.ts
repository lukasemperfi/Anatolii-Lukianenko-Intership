import * as dotenv from "dotenv";
dotenv.config();

import { setupDb } from "./db/db-setup";
import { logger } from "./utils/logger";
import { createWebServer } from "./utils/createWebServer";

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = createWebServer();

    setupDb();

    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);

      logger.info(`Server started on ${PORT}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

start();
