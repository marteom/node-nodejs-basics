import path from 'node:path';
import numCPUs from 'node:os';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const performCalculations = async () => {
    const cpuCount = numCPUs.availableParallelism();

    let workersList = [];

    for(let i=0; i<cpuCount; i++) {
        workersList.push(new Promise((resolve, reject) => {
            const worker = new Worker(__dirname + '/worker.js', {
                workerData: i + 10
            });

            worker.on('message', (msg) => {
                //console.log(msg);
                resolve({
                    status: 'resolved',
                    data: msg
                })
            });
            worker.on('error', (err) => {
                //console.log('err: ', err.message);
                reject({
                    status: 'error',
                    data: null
                })
            });       
        }));
    }

    console.log(await Promise.all(workersList));
};

await performCalculations();