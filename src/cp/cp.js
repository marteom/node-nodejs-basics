'use strict';

import path from 'node:path';
import { fileURLToPath } from 'url';
import child_process from 'node:child_process';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const spawnChildProcess = async (args) => {

    const child = child_process.fork(__dirname + '/files/script.js', args);
    
    child.on('message', (code) =>
        console.log(`Message to parent: ${code}`)
    );
    
    child.on('close', (code) =>
        console.log(`Child process exited. Code: ${code}`)
    );
};

spawnChildProcess(process.argv);
