import cluster from "cluster";
import { cpus } from "os";
import { createWebServer } from "./createClusterServer.js";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  masterProcess();
} else {
  childProcess();
}

function masterProcess() {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
}

function childProcess() {
  const app = createWebServer();
  const PORT = 5555;

  app.listen(PORT, () => {
    console.log(`server ${process.pid} listening on port ${PORT}`);
  });
}
