import fs from 'fs';

import readline from "readline"

// Read file by lines
function readFileToArr(fReadName, cb) {

    var arr = [];
    var readObj = readline.createInterface({
        input: fs.createReadStream(fReadName)
    });

    readObj.on('line', function (line) {
        arr.push(line);
    });
    readObj.on('close', function () {
        console.log('readLine close....');
        cb(arr);
    });
}

readFileToArr('readme.txt', function (arr) {
    console.log(arr);
});

const readInterface = readline.createInterface({
    input: fs.createReadStream('readme.txt'),
    output: process.stdout,
    console: false
});

readInterface.on('line', function (line) {
    console.log(line);
});


// Read Nth character from file
const readByNthChar = async (charPos) => {
    const str = await readFile('readme.txt', 'utf-8')
    console.log(str.charAt(charPos));
}

readByNthChar(0)

// Write javascript object to file as JSON, read JSON
fs.readFile('student.json', (err, data) => {
    if (err) {
        throw err
    };
    let student = JSON.parse(data);
    console.log(student);
});

 const writeJSONtoFile = (data, path) => {

    let dataJson = JSON.stringify(data);
    
    fs.writeFile(path, dataJson, 'utf8', (err) => {
        if (err) {
            console.log(err);
        };
        console.log('Data written to file');
    });
}

