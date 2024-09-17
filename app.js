const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login form HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle form submission
app.post('/login', (req, res) => {
    const { username, password,sec_and_grp } = req.body;

    // Save user data to a text file
    const userData = `Username: ${username}, Password: ${password}, sec_and_grp: ${sec_and_grp}\n`;
    fs.appendFile('users.txt', userData, (err) => {
        if (err) throw err;
        console.log(`User ${username} has logged in.`);
    });

    // Send a response back to the user
    res.send(`<h1>You are logged in as ${username}</h1>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
