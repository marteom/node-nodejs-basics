import readlinePromises from 'readline/promises';
import fs from 'fs';

const write = async () => {
    const filePath = new URL('files/fileToWrite.txt', import.meta.url);

    const outputStream = fs.createWriteStream(filePath, {flags: 'a'});
    
    const rl = readlinePromises.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
        for await (const line of rl) {
            outputStream.write(line + '\r\n');
        }
    }
    catch(err) {
        process.stderr.write(err.message);
    }

};

await write();