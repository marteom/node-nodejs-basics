import { access, writeFile } from 'fs/promises';

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

const create = async () => {
    const fullFileName = new URL('./files/fresh.txt', import.meta.url);

    const isFileExist = await checkExist(fullFileName);

    if(isFileExist) {
        throw new Error('FS operation failed');
    }
    else {
        const content = 'I am fresh and young';
        await writeFile(fullFileName, content);      
    }
};

await create();