const http = require("http");
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
app.set("view engine",ejs);
app.set("views",path.join(__dirname,"/views"));


//console.dir(app);

const port = 8080 || process.env.port;

app.listen(port,()=>{console.log(port);})

// app.use((err)=>{
//   console.log("REQ");
//   if(err) {
//     //console.log(err);
//   }
// })

app.get("/apple/:appletype",(req,res)=>{
   const {appletype} = req.params;
   res.send(appletype); // returns /apple/myrandomquery 
})


app.get("/search",(req,res)=>{
   res.send(req.query);
})


app.get("/ejs",(req,res)=>{
   res.render("home.ejs");
})

app.get("/msg",(req,res)=>{
   res.send(req.route.path);
})

app.get("/test",(req,res)=>{
   //res.send("Main route");
   console.dir(req.route.stack[0].method);
   if(req.route.methods.get) {
    res.json(req.route);
   }
})

app.get("*",(req,res)=>{
   res.send('<h2> Unknown path</h2>')
});











//create a server object:
// http
//   .createServer((req, res)=> {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080

