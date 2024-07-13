const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080;

// Load 404 page content
const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Handle root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
})

app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(__dirname, "contact-me.html"));
})

// Handle all other routes
app.use((req, res, next) => {
    res.status(404).send(page404);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
