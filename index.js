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

server.get("/", (req, res) => {
    res.status(200).json({greeting: "Hello world!"});
});

server.get("/api/users", (req, res) => {
    if (users && users.length > 0) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." }); //does it matter if your failure is in the if or the else?
    }
});

//POST A NEW USER
server.post("/api/users", (req, res) => {
    const newUser = Object.assign(req.body, { id: shortid.generate()});
    console.log(req.body);
    if (newUser.name && newUser.bio) {
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

// server.post("/api/users", (req, res) => {
//     const newUser = req.body;
//     newUser.id = shortid.generate();
//     users.push(newUser)
//     res.status(201).json({ message: newUser })
//     if(!newUser){
//         res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
//     }else{
//         res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
//     }
// })

server.get("/api/users/:id", (req, res) => {

});