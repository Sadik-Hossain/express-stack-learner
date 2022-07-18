const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  //   res.send("hello world");
  //   res.attachment() //for pdf or any other file
  //   res.json({
  //     message: "hello there!",
  //   });
  res.send(`<h1>hello from home</h1>`);
});

app.get("/pages", (req, res) => {
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
  fs.readFile("./pages/help.html", (err, data) => {
    if (err) {
      console.log(`error`, err);
      res.send(`<h1>something went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
});
//* server start
app.listen(4000, () => {
  console.log(`server is litening`);
});
