// import * as fs from 'fs/promises'
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// let TEST_MD_URL = `${__dirname}/_drafts/markdown_template.md`;
let TEST_MD_URL = `${__dirname}/_drafts/01_test_serial_number.md`;

const resetIndex = (index) => {
  return Array(index || 1).fill(0);
};

const isNaN = (value) => {
  return value !== value;
};

const setNumber = (indexList, titleArr, line) => {
  const number = indexList.join(".") + ".";
  if (isNaN(+titleArr[1])) {
    titleArr.splice(1, 0, number);
  } else {
    titleArr.splice(1, 1, number);
  }
  line = titleArr.join(" ");
  return line;
};

// 设置编号
const serialNumber = (fileList) => {
  const { outputFile: inputFile, inputFile: outputFile } = fileList;
  // 读取行，并编号
  var fRead = fs.createReadStream(inputFile);
  var objReadLine = readline.createInterface({
    input: fRead,
  });

  let isCodeBlock = false;
  let index = 1;
  let indexList = resetIndex();
  objReadLine.on("line", (line) => {
    if (line.indexOf("```") === 0) {
      isCodeBlock = !isCodeBlock;
    }

    // 代码块中的 # 无需编号
    if (line.indexOf("#") === 0 && !isCodeBlock) {
      const titleArr = line.split(" ");
      const level = titleArr[0].length - 1;
      if (level > 0) {
        if (level > indexList.length) {
          indexList.push(1);
          line = setNumber(indexList, titleArr, line);
        } else if (level === indexList.length) {
          indexList[level - 1] += 1;
          line = setNumber(indexList, titleArr, line);
        } else {
          indexList.splice(level);
          indexList[level - 1] += 1;
          line = setNumber(indexList, titleArr, line);
        }
      }
    }

    if (index === 1) {
      fs.writeFileSync(TEST_MD_URL, line + "\n");
    } else {
      fs.appendFileSync(TEST_MD_URL, line + "\n", "utf8", (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    index++;
  });

  objReadLine.on("close", (err) => {
    if (err) return console.log(err);
    console.log("auto serial number success!");
  });
};

const copy = (inputFile) => {
  TEST_MD_URL = inputFile ? inputFile : TEST_MD_URL;
  return new Promise((resolve, reject) => {
    // 复制文件
    const affix = TEST_MD_URL.substring(TEST_MD_URL.lastIndexOf("."));
    const outputFile = TEST_MD_URL.substring(0, TEST_MD_URL.lastIndexOf(".")) + `_origin${affix}`;

    // fs.createReadStream(TEST_MD_URL).pipe(fs.createWriteStream(outputFile));
    fs.copyFile(TEST_MD_URL, outputFile, (err) => {
      if (err) {
        console.log(err);
      } else {
        resolve({ inputFile: TEST_MD_URL, outputFile });
      }
    });
  });
};

// 实现
const main = () => {
  let inputFile = "";
  if (process.argv.length > 2) {
    inputFile = process.argv.splice(2)[0];
    inputFile = path.resolve(inputFile);
  }

  copy(inputFile)
    .then((res) => {
      serialNumber(res);
    })
    .catch(() => {});
};

main();
