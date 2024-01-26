import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises';

const calculateHash = async () => {
    try{
        const filePath = new URL('./files/fileToCalculateHashFor.txt', import.meta.url);
        const fileContent = await readFile(filePath, {encoding: "utf8"});
        const generatedHash = createHash('sha256').update(fileContent).digest('hex');
        console.log(generatedHash);
    }
    catch(ex) {
        console.log(ex.message);
    }
};

await calculateHash();