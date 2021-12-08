const fs = require('fs') // fs = file system module
const http = require('http'); // gives us networking capabilities




//////// FILES  /////////////
// Blocking, synchronous method
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput)
const textOut = `This is what we know aboue the avocado: ${textInput}.\ Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut)
// console.log("File written!")



// READ ASYNCHRONOUS WAY  - 2 arguments 
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=> { // read file 2nd arg is utf8 - 1st param is error
//   if(err) return console.log('ERROR! ')

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=> { // read file 2nd arg is utf8 - 1st param is error
//    console.log(data2);
//    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3)=> { // read file 2nd arg is utf8 - 1st param is error
//    console.log(data3)

//    fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//       console.log('Your file has been written 🏄🏽‍♂️')
//    })
//   })
//   })
// })
// console.log('will read file'); // logs first before fs.readFile



//////// SERVER  /////////////
http.createServer((res, res) => {
  res.end('Hello from the server!');
})