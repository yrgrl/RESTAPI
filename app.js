const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store users
let users = [];

// Route to display a heading
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Techgetafrica API</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    p {
                        font-size: 1.2em;
                        text-align: center;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                        text-align: center;
                    }
                    li {
                        background: #007BFF;
                        color: white;
                        margin: 10px;
                        padding: 10px;
                        border-radius: 5px;
                        display: inline-block;
                    }
                    li:hover {
                        background: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h1>Techgetafrica</h1>
                <p>Welcome to the Techgetafrica API!</p>
                <p>Use the following endpoints:</p>
                <ul>
                    <li><strong>POST</strong>-Create a new user</li>
                    <li><strong>GET</strong>-Get all users</li>
                    <li><strong>GET</strong>-Get a user by ID</li>
                    <li><strong>PUT</strong>-Update a user by ID</li>
                    <li><strong>DELETE</strong>-Delete a user by ID</li>
                </ul>
            </body>
        </html>
    `);
});

// Create a new user (POST)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser    = { id: users.length + 1, name, email };
    users.push(newUser   );
    res.status(201).json(newUser   );
});

// Get all users (GET)
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a user by ID (GET)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User  not found');
    }
    res.json(user);
});

// Update a user by ID (PUT)
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User  not found');
    }
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.json(user);
});

// Delete a user by ID (DELETE)
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).send('User  not found');
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});