const fs = require('fs') // fs = file system module
const http = require('http'); // gives us networking capabilities
const url = require('url'); 



//////// FILES  /////////////
// Blocking, synchronous method
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput)
// const textOut = `This is what we know aboue the avocado: ${textInput}.\ Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
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
//server is the result of the create method
const server = http.createServer((req, res) => {
  const pathName = req.url

  if(pathName === "/" || pathName === "/overview" ){
    res.end('This is the OVERVIEW URL');
  } else if(pathName === "/product"){
    res.end('This is the PRODUCT URL');
  } else if(pathName === "/api") {
    fs.readFile('./dev-data/data.json', 'utf-8', (err, data ) => {
      console.log(JSON.parse(data));
    })



    res.end("API route")
  }else {
    //errors and status code need to happen before sending out response.
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    }); // print error to console
    res.end('<h1>PAGE NOT FOUND</h1>');
  }


  // res.end('Hello from the server! 🍕'); // only ONE res.end allowed - if I uncomment this it breaks
  // console.log(req.url)
})

// can pass optional argument as callback fn
server.listen(8000, '127.0.0.1', () => {
console.log('Listening to requests on port 8000')

}) // standard ip address for localhost 