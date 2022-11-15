import fs from 'fs';
import { readdir } from 'fs/promises';

export const displayDirectroryTree = (dirName, depth) => {
    if (!fs.existsSync(dirName)) {
        return
    }

    const firstDirName = dirName

    const recur = async (dirName, depth) => {

        try {

            const items = await readdir(dirName, { withFileTypes: true })
            const separator = '|__'

            if (depth < 1) {
                console.groupEnd()
                return
            }

            if (dirName === firstDirName) {
                console.group(firstDirName)
            }

            for (const item of items) {

                if (item.isDirectory()) {
                    console.group(separator + item.name)

                    await recur(`${dirName}/${item.name}`, depth - 1)
                } else {
                    console.log(separator + item.name)
                }

            }
            console.groupEnd()
        } catch (error) {
            console.error(error);
        }

    }

    recur(dirName, depth)
}
