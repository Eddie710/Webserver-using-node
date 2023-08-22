//Import Required Modules:
const http = require("http");
const fs = require("fs");

//Define Server Configuration:
const hostname = "127.0.0.1";
const port = 3200;

//Read HTML and Image Files:
const homePage = fs.readFileSync("./main.html");
const teamPage = fs.readFileSync("./about.html");
const planPage = fs.readFileSync("./plans.html");
const contactPage = fs.readFileSync("./contact.html");

//Create HTTP Server:
const server = http.createServer((req, res) => {
//Handle Incoming Requests:
  if (req.url === "/main.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(homePage);
  } else if (req.url === "/about.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(teamPage);
  } else if (req.url === "/plans.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(planPage);
  } else if (req.url === "/contact.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(contactPage);
//This section sets the HTTP status code and response headers based on the requested resource. The content of the HTML or image file is written to the response body using the res.write method. Finally, the response is ended with res.end().
  } else if (req.url.match("\.jpg$")) {
    try {
      res.statusCode = 200;
      res.setHeader("Content-Type", "image/jpg");
      imgLoc = req.url.replace("/", "./");
      console.log(imgLoc);
      image = fs.readFileSync(imgLoc);
      res.end(image);
    } catch {
      res.statusCode = 404;
      res.write("404");
      console.log(req.url);
    }
  } else {
    res.statusCode = 404;
    res.write("404");
    console.log(req.url);
  }
  res.end();
});
//Start the Server:
server.listen(port, hostname, () => {
  console.log("Server is now running");
});
