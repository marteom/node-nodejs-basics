import { access, readFile } from 'node:fs/promises';

const checkExist = async (fullFileName) => {
    try {
        const checkResult = await access(fullFileName);
        if(!checkResult) {
            return true;
        }
    }
    catch {
        return false;
    }
}

const read = async () => {
    const fullFileName = new URL('files/fileToRead.txt', import.meta.url);

    const isFileExist = await checkExist(fullFileName);

    if(!isFileExist) {
        throw new Error('FS operation failed');
    }
    else {
        const fileContent = await readFile(fullFileName, {encoding: "utf8"});
        console.log(fileContent);      
    }
};

await read();