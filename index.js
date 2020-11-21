const http = require("http");
const express = require("express");
const ejs = require("ejs");
const path = require("path"); // used with app.set to join cwd dir aka __dirname ...
const app = express();

const redditData = require(__dirname+"/data.json");
app.set(express.static(path.join(__dirname,"/public")));

app.set("view engine",ejs);
app.set("views",path.join(__dirname,"/views"));
//const staticPub = __dirname+"/public";
//console.log(staticPub)



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

app.get("/reddit/:rParams",(req,res)=>{
   const {rParams} = req.params;
   const data = redditData[rParams]; // e.g lets say socccer /reddit/soccer 
   res.render("soccer.ejs",{...data}) // spread the object into item instead of passing a whole obj
})

app.get("/search",(req,res)=>{
   res.send(req.query);
})


app.get("/ejs/:randomNumParam",(req,res)=>{
   const {randomNumParam} = req.params
   const randomNumber = Math.floor(Math.random(60)*randomNumParam);
   res.render("home.ejs",{randomNumber:randomNumber});
})


app.get("/params/:paramsData",(req,res)=>{
   const {paramsData} = req.params;
   res.render("params.ejs",{paramsData});
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

