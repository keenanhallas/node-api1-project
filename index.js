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

server.get("/users", (req, res) => {
    res.status(200).json(users);
});