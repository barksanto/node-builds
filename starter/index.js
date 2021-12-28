const fs = require('fs') // fs = file system module
const http = require('http'); // gives us networking capabilities
const url = require('url');  // need this to parse variables from the url after selecting a product




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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRODUCTIMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%PRODUCTNUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCTPRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  
  return output
}
// this top level code is only executed once we start the program since thats the only time it's needed
// only read data one time - then read it from the variable for each subsequent request

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8'); 
const tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data); //all of the objects in data.json
let arr = [tempOverview,tempCard,tempProduct,dataObject ]
// console.log(arr)

//server is the result of the create method
const server = http.createServer((req, res) => {
  // console.log(req.url) // shows final request slug of route
  // console.log(url.parse(req.url, true)) // logs all data for the request
  const {query, pathname} = url.parse(req.url, true) // destructuring object to hold vars from the object


  // Overview Page
  if(pathname === "/" || pathname === "/overview" ){
    res.writeHead(200, {'Content-type': 'text/html'})
    
    // dataObject is just the json file
    const cardsHtml = dataObject.map(item => replaceTemplate(tempCard, item)).join(''); // join turns it from an array to a string

    //replace the placeholderwith the HTML we just created
    const output = tempOverview.replace(/{%PRODUCTCARDS%}/, cardsHtml)
    // console.log(cardsHtml); // logs json to the server

    res.end(output);

  // Product Page
  } else if(pathname === "/product"){
    res.end('This is the PRODUCT URL');
    console.log(query)


    // API Page
  } else if(pathName === "/api") {
      res.writeHead(200, {'Content-type': 'application/json'})
      res.end(data);
    // res.end("API route") ONLY ONE ALLOWED - THIS FUCKS IT UP
    
    // Not found page
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
      