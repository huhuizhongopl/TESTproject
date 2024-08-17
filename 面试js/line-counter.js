const fs = require('fs');
const path = require('path');
function countLinesInDirectory(dirPath, fileExtension) {
    let totalLines = 0;
    function countLinesInFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        totalLines += lines.length;
    }
    function processDirectory(directoryPath) {
        const files = fs.readdirSync(directoryPath);
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile() && path.extname(file) === fileExtension) {
                countLinesInFile(filePath);
            } else if (stats.isDirectory()) {
                processDirectory(filePath);
            }
        });
    }
    processDirectory(dirPath);
    return totalLines;
}
// 命令⾏参数，第⼀个参数是⽬录路径，第⼆个参数是⽂件扩展名
const [_, __, dirPath, fileExtension] = process.argv;
const linesCount = countLinesInDirectory(dirPath, fileExtension);
console.log(`Total lines of ${fileExtension} files in ${dirPath}:
${linesCount}`);
