// import * as fs from 'fs/promises'
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let TEST_MD_URL = `${__dirname}/z/_posts/test.md`;

// console.log(typeof fs.readFile);
// console.log(12);

// console.log(process);
// console.log(process.argv);

// const arguments = process.argv.splice(2)
// console.log(arguments);

// const fileUrl = new URL('file:///z/_posts');
// fs.readFileSync(fileUrl)

// console.log(__dirname);

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
  fs.appendFile(TEST_MD_URL, 'hello world! 哈哈', 'utf8', (err) => {
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

const resetIndex = (index) => {
  return Array(index || 1).fill(0)
}

const serialNumber = (fileList) => {
  const temp = {
    inputFile: 'D:\\bkWork\\simplex/z/_posts/test.md',
    outputFile: 'D:\\bkWork\\simplex/z/_posts/test_no_number.md'
  }
  const {outputFile: inputFile, inputFile: outputFile} = fileList || temp
  // console.log('outputFile', outputFile);
  // console.log('inputFile', inputFile);
  // 读取行，并编号
  var fRead = fs.createReadStream(inputFile);
  var objReadLine = readline.createInterface({
    input: fRead
  });

  let index = 1;
  let indexList = resetIndex();
  objReadLine.on('line', (line) => {
    if (line.indexOf("#") === 0) {
      const titleArr = line.split(' ');
      const level = titleArr[0].length-1;
      if (level > indexList.length) {
        indexList.push(1);
        const number = indexList.join('.')+'.';
        titleArr.splice(1, 0, number);
        line = titleArr.join(' ');
      } else if (level === indexList.length) {
        indexList[level - 1] += 1;
        const number = indexList.join('.')+'.';
        titleArr.splice(1, 0, number);
        line = titleArr.join(' ');
      } else {
        indexList.splice(level);
        indexList[level - 1] += 1;
        const number = indexList.join('.')+'.';
        titleArr.splice(1, 0, number);
        line = titleArr.join(' ');
      }
    }
    if (index === 1) {
      fs.writeFileSync(TEST_MD_URL, line + '\n');
    } else {
      fs.appendFileSync(TEST_MD_URL, line + '\n', 'utf8', (err) => {
        if (err) {
          console.log(err);
        }
      })
    }

    index++
  });

  objReadLine.on('close', (err) => {
    if (err) return console.log(err);
    console.log('auto serial number success!');
  })
}

const copy = (inputFile) => {
  TEST_MD_URL = inputFile ? inputFile : TEST_MD_URL;
  return new Promise((resolve, reject) => {
    // 复制文件
    // console.log(TEST_MD_URL);
    const affix = TEST_MD_URL.substring(TEST_MD_URL.lastIndexOf('.'))
    // console.log(affix);
    const outputFile = TEST_MD_URL.substring(0, TEST_MD_URL.lastIndexOf('.')) + `_no_number${affix}`
    // console.log(outputFile);

    // fs.createReadStream(TEST_MD_URL).pipe(fs.createWriteStream(outputFile));
    fs.copyFile(TEST_MD_URL, outputFile, (err) => {
      if (err) {
        console.log(err);
      } else {
        resolve({inputFile: TEST_MD_URL, outputFile});
      }
    })

  })
}

// 实现
const main = () => {
  let inputFile = '';
  if (process.argv.length > 2) {
    inputFile = process.argv.splice(2)[0];
    inputFile = path.resolve(inputFile);
  }

  copy(inputFile)
    .then(res => {
      serialNumber(res)
    })
    .catch(() => {})
}

// writeFile();
// appendFile();
// readFile()
// readLineFile(TEST_MD_URL, (data) => {
//   console.log(data);
// })

main()