const express = require("express");
const fs = require("fs");
const path = require("path");
const url= require('url');

const app = express();
const port = 8080;

// Load 404 page content
const page404 = fs.readFileSync("public/404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.get((req, res) => {
    let filename = "";
    const q = url.parse(req.url, true);

    if (q.pathname === "/") {
        filename = "./public/index.html";
    } else {
        filename = "public/" + q.pathname;
    }
    res.send(filename)
})

// Handle all other routes
app.use((req, res, next) => {
    res.status(404).send(page404);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
