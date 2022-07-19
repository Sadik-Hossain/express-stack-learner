const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const router = express.Router();
//* router express theke extract kora holo
//* ebar shob app. ke router dara replace kore dibo . then error show krbe client side e " cannot get/ ". eta basically router ekta middleware se jnno app ke bujhate hobe-> app.use(router)
//* ------------ middleware -----------------
//* ekhane direct app er sathe middleware use kora hyece, fole era global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//* router as middleware
// app.use(router);
app.use(require("./router.js"));

//* local  404 error
// app.use((req, res, next) => {
//   res.status(404).send(`<h1>404 page not found</h1>`);
// });

//* sending 404 error to global handler by passing it as a error obj in next()
app.use((req, res, next) => {
  const error = new Error(
    `404 not found, something went wrong. please try again later`
  );
  error.status = 404;
  next(error);
});

//*--------------- global error handler -----------------
app.use((error, req, res, next) => {
  console.log(`Error`, error);
  //* status code thaka mane hocce amader nijeder generate kora error
  if (error.status) {
    return res.status(error.status).send(`<h1>${error.message}</h1>`);
  }
  //* ar status code provide kora na thakle bujhte hobe internal server error.
  res.status(500).send(`<h1>server-side error/ internal server error</h1>`);
});

//* custom global middleware
app.use(globalM); // we dont have to call fn. cz, we maintained signature.
// app.use(globalC()); // if we used like in line: 125
//* ---------------------------------------------------

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
