import express from "express";

import { divideWorkAndGetSum } from "./divideWorkAndGetSum.js";

export const createWorkerThreadsServer = () => {
  const app = express();

  app.get("/sumofprimeswiththreads", async (req, res) => {
    const startTime = new Date().getTime();
    const sum = await divideWorkAndGetSum()
      .then((values) =>
        values.reduce((accumulator, part) => accumulator + part.result, 0)
      )
      .then((finalAnswer) => finalAnswer);

    const endTime = new Date().getTime();
    res.json({
      number: 600000,
      sum: sum,
      timeTaken: (endTime - startTime) / 1000 + " seconds",
    });
  });

  return app;
};
