import zlib from 'node:zlib';
import fs from 'fs';
import { pipeline } from 'node:stream';

const decompress = async () => {

    const inputZipPath = new URL('files/archive.gz', import.meta.url);
    const OutputfilePath = new URL('files/fileToCompress.txt', import.meta.url);

    const unzip = zlib.createUnzip();
    const input = fs.createReadStream(inputZipPath);
    const output = fs.createWriteStream(OutputfilePath);

    pipeline(input, unzip, output, (error) => {
        if (error) console.log(error);
    });

};

await decompress();