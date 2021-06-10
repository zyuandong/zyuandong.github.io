// import * as fs from 'fs/promises'
const fs = require('fs')
const readline = require('readline');
const { callbackify } = require('util');

const TEST_MD_URL = `${__dirname}/z/_posts/test.md`;
const TEST_TXT_URL = `${__dirname}/z/_posts/test.txt`;

// console.log(typeof fs.readFile);
// console.log(12);

// console.log(process);
// console.log(process.argv);

// const arguments = process.argv.splice(2)
// console.log(arguments);

// const fileUrl = new URL('file:///z/_posts');
// fs.readFileSync(fileUrl)

console.log(__dirname);

// 写入
const writeFile = () => {
  fs.writeFile(TEST_MD_URL, 'hello world! 哈哈', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  })
}


// 追加
const appendFile = () => {
  fs.appendFile(TEST_MD_URL, 'hello world! 哈哈', 'utf-8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('append success!');
  })
}

// 读取
const readFile = () => {
  fs.readFile(TEST_MD_URL, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(data.toString());
    }
  })
}

// 按行读取
const readLineFile = (path, callback) => {
  var fRead = fs.createReadStream(path);
  var objReadLine = readline.createInterface({
    input: fRead
  });
  var arr = new Array();
  objReadLine.on('line', (line) => {
    console.log(line);
    arr.push(line);
  })

  objReadLine.on('close', () => {
    callback(arr);
  })
}

// writeFile();
// appendFile();
// readFile()
readLineFile(TEST_MD_URL, (data) => {
  console.log(data);
})