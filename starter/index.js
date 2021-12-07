const fs = require('fs') // fs = file system module
  
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textInput)

const textOut = `This is what we know aboue the avocado: ${textInput}.\ Created on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut)

console.log("File written!")