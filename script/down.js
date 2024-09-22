const fs = require('fs');
const path = require('path');

function treeDir(root_dir, dir, results) {
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        let file_path = path.relative(root_dir, filePath).replaceAll('\\', '/')

        if (stat && stat.isDirectory()) {
            results.push(file_path)
            treeDir(root_dir, filePath, results)
        } else {
            results.push(file_path)
        }
    });
}

function listDir(dir) {
    let results = [];

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        let file_path = path.relative(directoryPath, filePath).replaceAll('\\', '/')
        if(!file.startsWith('.')) {
            if (stat && stat.isDirectory()) {
                results.push({
                    path: file_path,
                })
            }
        }
    });

    results.map(file => {
        const filePath = path.join(dir, file.path);
        let results = []
        treeDir(filePath, filePath,results)
        file.tree = results
        return file
    })

    return results;
}

const directoryPath = 'E:\\T\\Documents\\VSCode\\proj\\40-live2d\\live2d-model'
const tree = listDir(directoryPath);

const output = { tree: tree };

fs.writeFileSync('../scripts/live2d-model-tree.json', JSON.stringify(output, null, 2), 'utf-8');

console.log('JSON 文件已生成');
