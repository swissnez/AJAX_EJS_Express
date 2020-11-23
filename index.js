const http = require("http");
const express = require("express");
const ejs = require("ejs");
const path = require("path"); // used with app.set to join cwd dir aka __dirname ...
//const { urlencoded } = require("express"); ??
const app = express();

const redditData = require(__dirname+"/data.json");
//const comments = require(__dirname+"/comments.js");
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true})); // allows POST method to use the req.body
app.use(express.json()); // use JSON payload requests when posting 
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

const comments = [
   {
      username: "RikoLipps",
      comment: "I am so fine with blue ears"
   },
   {
      username: "SummySunny",
      comment: "felix was mine onces"
   },
   {
      username: "dorathygobble",
      comment: "indie go go, here we go!!!"
   }
 ]
 

app.get("/comments",(req,res)=>{
   res.render("comments.ejs",{comments});
})

app.post("/comments",(req,res)=>{
   const {username,comment} = req.body;
   comments.push({username,comment}); // push in an object of the key values
   if (comment === null ) res.json(comments); // return a json output in the browser
   res.redirect("/comments")
})



app.get("/comments/new",(req,res)=>{
res.render("commentsNew.ejs",{});
})

app.get("/forms",(req,res)=>{
   res.render("Form.ejs");
});

app.post("/forms",(req,res)=>{
   let query = req.body;
   res.json(query);
})

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
   res.render("home.ejs",{randomNumber});
})

app.get("/home",(req,res)=>{
   res.render("home.ejs");
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

