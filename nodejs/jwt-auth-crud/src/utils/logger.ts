import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: "logs/all.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
});
