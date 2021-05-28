#!/usr/bin/env node

let fs = require("fs");

let inputArr = process.argv.slice(2);
// console.log(inputArr);
let optionsArr = [];
let fileArr = [];
for (let i = 0; i < inputArr.length; i++) {
  let s = inputArr[i];
  if (s[0] == "-") {
    optionsArr.push(s);
  } else {
    fileArr.push(s);
  }
}

if (optionsArr.includes("-n") && optionsArr.includes("-b")) {
  console.log("Enter either of -n or -b");
  return;
}
for (let i = 0; i < fileArr.length; i++) {
  if (fs.existsSync(fileArr[i]) == false) {
    console.log(`file ${fileArr[i]} doesn't exists`);
    return;
  }
}

let content = "";
for (let i = 0; i < fileArr.length; i++) {
  content += fs.readFileSync(fileArr[i]) + "\r\n";
}
// console.log(content);
let contentArr = content.split("\r\n");
let isSPresent = optionsArr.includes("-s");

if (isSPresent) {
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] == "" && contentArr[i - 1] == "") {
      contentArr[i] = null;
    } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
      contentArr[i] = null;
    }
  }
  let tempArr = [];
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
      tempArr.push(contentArr[i]);
    }
  }
  contentArr = tempArr;
}
//
let isNPresent = optionsArr.includes("-n");
if (isNPresent) {
  for (let i = 0; i < contentArr.length; i++) {
    contentArr[i] = `${i + 1} ${contentArr[i]}`;
  }
}

let isBPresent = optionsArr.includes("-b");
if (isBPresent) {
  let count = 1;
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != "") {
      contentArr[i] = `${count} ${contentArr[i]}`;
      count++;
    }
  }
}
console.log(contentArr.join("\n"));
