import { readdir, mkdir, copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const copy = async () => {

    const sourceDir = path.resolve(__dirname, 'files');
    const destDir = path.resolve(__dirname, 'files_copy');

    const isSourceDirExist = await checkExist(sourceDir);
    const isDestDirExist = await checkExist(destDir);

    if(!isSourceDirExist || isDestDirExist) {
        throw new Error('FS operation failed');
    }

    const copyDir = async (sourcePath, destPath) => {
        await mkdir(destPath, { recursive: true });

        const objData = await readdir(sourcePath, { withFileTypes: true });
        for (const obj of objData) {
            if (obj.isFile()) {
                await copyFile(path.join(sourcePath, obj.name), path.join(destPath, obj.name));
            }
            else if (obj.isDirectory()) {
                await mkdir(path.join(destPath, obj.name), { recursive: true });
                await copyDir(path.join(sourcePath, obj.name), path.join(destPath, obj.name));
            }
        }
    }

    await copyDir(sourceDir, destDir);
};

await copy();
