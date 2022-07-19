const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//* ------------ middleware -----------------
//* ekhane direct app er sathe middleware use kora hyece, fole era global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
//* custom global middleware
app.use(globalM); // we dont have to call fn. cz, we maintained signature.
// app.use(globalC()); // if we used like in line: 125
//* ---------------------------------------------------

app.get("/", (req, res) => {
  //   res.send("hello world");
  //   res.attachment() //for pdf or any other file
  //   res.json({
  //     message: "hello there!",
  //   });
  res.send(`<h1>hello from home</h1>`);
});

app.get("/pages", (req, res) => {
  //console.log(req.url); // shows which endpoint user hit on the server
  //* fs module read from the specified path and take a callback fn(err,data)
  //* data:buffer is chunk of binary code
  fs.readFile("./pages/index.html", (err, data) => {
    if (err) {
      console.log(`Error`, err);
      res.send(`<h1>Something went wrong</h1>`);
    } else {
      res.write(data);
      //* response end kora

      //* The res.end() method ends the current response process. This method is used to quickly end the response without any data. If one needs to respond with data, they should use either the res.send() method or the res.json() method.
      res.end();
    }
  });
});
app.get("/about", (req, res) => {
  fs.readFile("./pages/about.html", (err, data) => {
    if (err) {
      console.log(`error`, err);
      res.send(`<h1>something went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
});
app.get("/help", (req, res) => {
  //console.log(req.app); // shows the whole express app
  // console.log(req.hostname); // to check host name :localhost
  // console.log(req.ip); // to check ip address
  // console.log(req.method); // for checking methods
  // console.log(req.originalUrl); // to see full url
  // console.log(req.get("content-type")); // ki type er header asce
  // console.log(req.get("accept")); // ki type er header asce

  fs.readFile("./pages/help.html", (err, data) => {
    if (err) {
      console.log(`error`, err);
      res.send(`<h1>something went wrong</h1>`);
    } else {
      // console.log(res.headersSent); // help us measure time and know if response sent or not
      res.write(data);
      res.end();
      // console.log(res.headersSent);
      // res.attachement(`filename`) // for attaching file
      // res.append() // for combining http headers
      // res.cookies() // for generating cookies
      // res.clearCookies() // for clearing cooking
      // res.download("./pages/dsa-cheatsheet.pdf"); // for dowloadable
      // res.format({}) // for muliple content type jnno vinno vinno res pathate pari
    }
  });
});
app.get("/local", localM, (req, res) => {
  res.send(`<h1>I am local route</h1>`);
});
//* server start
app.listen(4000, () => {
  console.log(`server is listening`);
});

/** responsibilities of a middleware
 * - handle common tasks
 * - requests logs
 * - filter request
 * - modify or reshape request
 * - validate request body
 * - authenticate/ authorize request
 * - add additional details to req body
 * - response bad request
 * - pass req to next middleware or response handler
 */
// ------------------------------------------------------
/** non-global/local middleware usage
 * app.get("/route", cors(),(req,res)=>{...})
 * app.get("/routes", [cors(),cors(),cors()...],(req,res)=>{...})
 */
//* -------------- middleware signature -----------------
/**
 * function handler (){
 * - read req obj
 * - prcess req
 * - response back with a result
 * }
 *
 * function middleware(req,res,next){
 *
 * next() // next call na krle system hang krbe
 * }
 */
//* if everything seems ok controller will call response methods
//* if everything seems ok middleware will call next

//* -------------- custom global middleware -------------------
function globalM(req, res, next) {
  console.log(`${req.method}-${req.url}`);
  console.log(`I am global middleware`);

  //* req process, if bad req, return res. to prevent it from going to controller (actual response based on buisness logic)
  if (req.query.bad) {
    //* localhost:4000/?bad=true
    return res.status(400).send(`Bad request`);
  }
  next(); // if we dont pass server will hang, client loading hoitei thakbe
}
// function globalC() {
//   return function globalM(req, res, next) {
//     console.log(`${req.method}-${req.url}`);
//     console.log(`I am global middleware`);
//     next(); // if we dont pass server will hang, client loading hoitei thakbe
//   };
// }

//* ------------- custom local middleware -----------------------
function localM(req, res, next) {
  console.log(`Im a local middlewares`);
  next();
}
