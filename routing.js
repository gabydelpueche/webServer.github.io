//Declare built in js module functions
const http = require('http');
const fs = require('fs');

//Declare hostname and port for server
const hostname = 'localhost';
const port = 3000;

//snippet reads the content of four HTML files synchronously
const main = fs.readFileSync('main.html');
const album = fs.readFileSync('album.html');
const contact = fs.readFileSync('contact.html');

//create local server
const server = http.createServer((req, res) => {
    console.log(req.url);
    //checks the URL requested by the client and responds
    if (req.url === "/") {
        res.statusCode = 200;
        //.setHeader() informs client that the content being sent is in HTML format
        res.setHeader("Content-Type", "text/html");
        //.write() writes the html page the given variable directs
        res.write(main);

        } else if (req.url === "/album") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(album);

        } else if (req.url === "/contact") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(contact);
        
        } else if (req.url === "/main") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(main);

        //match the photos to the correct request and responds accordingly
        } else if (req.url.match("\.jpg$")) {
            try {
                //sets the HTTP status code and response headers based on the requested resource.
                res.statusCode = 200;

                //.setHeader() informs the client that the content being sent in the response body is an image of JPEG format
                res.setHeader("Content-Type", "image/jpg");

                //.replace()  modifies the requested URL received from the client by replacing the initial forward slash w/ a period
                //ex: /image.jpg >>> ./image.jpg
                imgLoc = req.url.replace("/", "./");

                console.log(imgLoc);
                image = fs.readFileSync(imgLoc);
                res.end(image);
            } catch {
                //catch error and throw 404 "page not found"
                res.statusCode = 404;
                res.write("404");
                console.log(req.url);
            }

        } else {
            //catch error and throw 404 "page not found"
            res.statusCode = 404;
            res.write("404");
            console.log(req.url);
        }
        //End response 
        res.end();
});

//Use .listen() to indicate readiness to accept cilent connection requests
server.listen(port, hostname, () => {
    console.log("Server is now running");
});
