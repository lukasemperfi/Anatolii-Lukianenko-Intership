import express from "express";
import { sumOfPrimes } from "./sumOfPrimes.js";

export const createWebServer = () => {
  const app = express();

  app.get("/sumofprimes", (req, res) => {
    const startTime = new Date().getTime();
    const sum = sumOfPrimes(req.query.number);

    const endTime = new Date().getTime();

    res.json({
      processPID: process.pid,
      number: req.query.number,
      sum: sum,
      timeTaken: (endTime - startTime) / 1000 + " seconds",
    });
  });

  return app;
};
