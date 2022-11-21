import { runWorker } from "./runWorker.js";

export function divideWorkAndGetSum() {
  const start1 = 2;
  const end1 = 150000;
  const start2 = 150001;
  const end2 = 300000;
  const start3 = 300001;
  const end3 = 450000;
  const start4 = 450001;
  const end4 = 600000;

  const worker1 = runWorker({ start: start1, end: end1 });
  const worker2 = runWorker({ start: start2, end: end2 });
  const worker3 = runWorker({ start: start3, end: end3 });
  const worker4 = runWorker({ start: start4, end: end4 });

  return Promise.all([worker1, worker2, worker3, worker4]);
}
