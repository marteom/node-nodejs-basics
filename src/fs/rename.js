import { rename as fs_rename, access } from 'node:fs/promises';

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

const rename = async () => {
    const sourceFile = new URL('files/wrongFilename.txt', import.meta.url);
    const destFile = new URL('files/properFilename.md', import.meta.url);

    const isSourceFileExist = await checkExist(sourceFile);
    const isDestFileExist = await checkExist(destFile);

    if(!isSourceFileExist || isDestFileExist) {
        throw new Error('FS operation failed');
    }

    try {
        await fs_rename(sourceFile, destFile);
    }
    catch {
        throw new Error('FS operation failed');
    }
};

await rename();