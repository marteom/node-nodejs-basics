import { readdir, access } from 'node:fs/promises';

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

const list = async () => {
    const dirPath = new URL('files', import.meta.url);

    const isSourceDirExist = await checkExist(dirPath);

    if(!isSourceDirExist) {
        throw new Error('FS operation failed');
    }

    const folderObjs = await readdir(dirPath, {withFileTypes: true});

    for (const obj of folderObjs) {
        console.log(obj.name);
      }
};

await list();