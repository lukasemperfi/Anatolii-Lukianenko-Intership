import { createWorkerThreadsServer } from "./createWorkerThreadsServer.js";

const start = () => {
  const app = createWorkerThreadsServer();
  const PORT = 5555;

  app.listen(PORT, () => {
    console.log(`server ${process.pid} listening on port ${PORT}`);
  });
};

start();
