const { dir } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const path = require("path");
const port = process.env.PORT || 3000;
const {Server} = require("socket.io");
const io =new  Server(server);


app.use(express.static(__dirname + '/public'))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

io.on("connection",(socket)=>{
    console.log("A user connected");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

server.listen(port,()=>{
    console.log(`connection is set up at ${port}`);
})