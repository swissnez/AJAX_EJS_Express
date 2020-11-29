
const express = require("express");
const methodOverride = require('method-override')
const ejs = require("ejs");
const path = require("path"); // used with app.set to join cwd dir aka __dirname ...
//const { urlencoded } = require("express"); ??
const app = express();
const {v4: uuid} = require("uuid"); // use uuid string as v4 hence {}

const redditData = require(__dirname+"/data.json");
//import {comments} from ".comments";

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true})); // allows POST method to use the req.body
app.use(express.json()); // use JSON payload requests when posting 
app.set("view engine",ejs);
app.set("views",path.join(__dirname,"/views"));


const port = 8080 || process.env.port;

app.listen(port,()=>{console.log(port);})


// ***** simulated DB *****
let comments = [
   {
      id: uuid(),
      username: "RikoLipps",
      comment: "I am so fine with blue ears"
   },
   {
      id: uuid(),
      username: "SummySunny",
      comment: "felix was mine onces"
   },
   {  id: uuid(),
      username: "dorathygobble",
      comment: "indie go go, here we go!!!"
   }
 ]
 


 const findComment = (id)=>{
   return comments.find(c=> c.id === parseInt(id) || id);
}


 app.get("/comments",(req,res)=>{
   res.render("comments.ejs",{comments});
})

app.get("/comments/new",(req,res)=>{
   res.render("commentsNew.ejs",{});
})

app.get("/comments/:id",(req,res)=>{
   const {id} = req.params;
   const returnedComment = findComment(id);
   if (returnedComment) res.render("commentsShow.ejs",{returnedComment});
})

app.get("/comments/:id/edit",(req,res)=>{
   const {id} = req.params;
   const editComment = findComment(id);
   res.render("edit.ejs",{editComment})
})

app.post("/comments",(req,res)=>{
   const {username,comment} = req.body;
   comments.push({id: uuid(),username,comment}); // push in an object of the key values
   if (comment === null ) res.json(comments); // return a json output in the browser
   res.redirect("/comments")
})

app.patch("/comments/:id",(req,res)=>{
   const {id} = req.params;
   const newComment = req.body.comment;
   const foundComment = findComment(id);
   foundComment.comment = newComment;
   res.redirect("/comments")
})

app.delete("/comments/:id",(req,res)=>{
   const {id} = req.params;
   comments = comments.filter(c=> c.id !== id);
   res.redirect("/comments");
});






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


// app.use((err)=>{
//   console.log("REQ");
//   if(err) {
//     //console.log(err);
//   }
// })
