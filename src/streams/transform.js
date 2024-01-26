import { pipeline } from 'stream/promises';
import { Transform } from "stream";

const transform = async () => {
    try {
        const uppercase = new Transform({
            transform(chunk, encoding, callback) {
                callback(null, [...chunk.toString()].reverse().join(""));
            },
        });

        await pipeline(
            process.stdin,
            uppercase,
            process.stdout
        );
    }
    catch (err) {
        process.stderr.write(err.message);
    }
};

await transform();