import { rm, access } from 'node:fs/promises';

const checkExist = async (path) => {
    try {
        const checkResult = await access(path);
        if(!checkResult) {
            return true;
        }
    }
    catch {
        return false;
    }
}

const remove = async () => {
    const sourceFile = new URL('files/fileToRemove.txt', import.meta.url);

    const isSourceFileExist = await checkExist(sourceFile);

    if(!isSourceFileExist) {
        throw new Error('FS operation failed');
    }

    try {
        await rm(sourceFile);
    }
    catch {
        throw new Error('FS operation failed');
    }
};

await remove();