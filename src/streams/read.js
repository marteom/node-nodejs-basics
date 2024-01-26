import fs from 'fs';

const read = async () => {
    const filePath = new URL('files/fileToRead.txt', import.meta.url);
    const readableStream = fs.createReadStream(filePath);
    readableStream.setEncoding('utf8');
    let data = '';

    try {
        for await (const chunk of readableStream) {
            data += chunk;
        }
        process.stdout.write(data + '\n');
    }
    catch(err) {
        process.stderr.write(err.message + '\n');
    }
}

await read();