const fs = require("fs");

exports.homeController = (req, res) => {
  //* home route e new error throw krci, for test purpose
  // throw new Error(`Something not right`);
  const error = new Error(`Bad request`);
  error.status = 400;
  throw error;
  //   res.send("hello world");
  //   res.attachment() //for pdf or any other file
  //   res.json({
  //     message: "hello there!",
  //   });
  res.send(`<h1>hello from home</h1>`);
};
exports.pageController = (req, res) => {
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
};
exports.aboutController = (req, res) => {
  fs.readFile("./pages/about.html", (err, data) => {
    if (err) {
      console.log(`error`, err);
      res.send(`<h1>something went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
};
exports.helpController = (req, res) => {
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
};
exports.localController = (req, res) => {
  res.send(`<h1>I am local route</h1>`);
};
