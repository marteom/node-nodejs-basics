import { pipeline } from 'stream/promises';
import { createGzip } from 'node:zlib';
import fs from 'fs';

const compress = async () => {

  const inputFilePath = new URL('files/fileToCompress.txt', import.meta.url);
  const ZipfilePath = new URL('files/archive.gz', import.meta.url);

    await pipeline(
        fs.createReadStream(inputFilePath),
        createGzip(),
        fs.createWriteStream(ZipfilePath)
      );
};

await compress();