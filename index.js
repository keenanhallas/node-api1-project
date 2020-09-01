const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

const port = 3333;

server.listen(port, () => console.log("server running..."));

let users = [
    {
        id: 1,
        name: "John Doe",
        bio: "Little is know about this man's identity.",
    },
    {
        id: 2,
        name: "Jane Doe",
        bio: "Little is know about this woman's identity.",
    }
]

//Sanity test
server.get("/", (req, res) => {
    res.status(200).json({greeting: "Hello world!"});
});

//Get all users
server.get("/api/users", (req, res) => {
    if (users && users.length > 0) { //is this an ok way to mock an error in retrieving the _users_ from the database?
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." }); //does it matter if your failure is in the if or the else?
    }
});

//Get a specific user
server.get("/api/users/:id", (req, res) => {    
    try {
        const id = Number(req.params.id);
        neededUser = users.filter(user => user.id === id);
        if (neededUser.length > 0) {
            res.status(200).json(neededUser);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
});

//Post a new user
server.post("/api/users", (req, res) => { //the order of object properties doesn't matter when posting, right?
    try{
        const newUser = Object.assign(req.body, { id: shortid.generate()});
        if (!newUser.name || !newUser.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else {
            users.push(newUser);
            res.status(201).json(newUser); //is this the user document?
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
});

//Delete a user
server.delete("/api/users/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        remainingUsers = users.filter(user => user.id !== id);
        if (remainingUsers.length === users.length) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(remainingUsers);
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
});

//Edit a user
server.put("/api/users/:id", (req, res) => {
    const changes = req.body;
    const id = Number(req.params.id);

    const found = users.find(user => user.id === id);

    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else if (found) {
            const updatedUser = Object.assign(found, changes);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
});

