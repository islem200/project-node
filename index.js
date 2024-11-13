
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article");
const connectDb = require('./db/db');

const app = express()
app.use(express.json())
 
//Méthode1:
//connectDb()

//Méthode2:
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected successfully to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the DB:", error.message);
  });


 app.get("/hello", (req, res)=>{
     res.send("hello")
 });



app.get("/numbers", (req, res)=>{
     let numbers = "";
     for (let i = 0; i<=100; i++){
         numbers +=i + "_";

     }
      
    res.send(`the numbers are: ${numbers}`);
    
});


//html
app.get("/file", (req, res)=>{
    
    res.sendFile(__dirname + "/views/numbers.html");
    
});

//ejs
app.get("/fileejs", (req, res)=>{
    
    res.render("numbers.ejs", {
        name: "islem", 

        
    });
    
});


app.get("/numbers", (req, res)=>{
     let numbers = "";
     for (let i = 0; i<=100; i++){
         numbers +=i + "_";

     }
      
    res.send(`the numbers are: ${numbers}`);
    
});

app.get("/findSummationn/:number1/:number2", (req, res)=>{
    const num1 = req.params.number1;
    const num2 = req.params.number2;

    //const total = +num1 + +num2;
    
    //or:

    const total = Number(num1) + Number(num2);


    
    //res.send(`the numbers are: ${num1}/${num2}`);

    res.send(`the total is ${total}`);
    
});

app.get("/say", (req, res)=>{
    
    // console.log(req.body);

    // console.log(req.query);
    // res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);

    res.json({
        name: req.body.name,
        age: req.query.age,
        language: "Arabic"
      

    });
    //res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);

    
});
  



app.get("/test", (req, res)=>{
    res.send("hello world")
});

app.put("/hello", (req, res)=>{
    res.send("hello world");
})

app.post("/addComment", (req, res)=>{
    res.send("post request on add comment")
});
 app.delete("/testingDelete", (req, res )=>{
    res.send(" delete request")
 }); 

 //=======>ARTICLES ENDPOINTS======

 app.post("/articles", async (req, res)=>{
    const newArticle = new Article()
    const artTitle = req.body.articleTitle;
    const artBody = req.body.articlebody;

    res.send(artTitle + " " + artBody);
    //return;

    // newArticle.title = "my first articles";
    // newArticle.body = "this is the body";
    // newArticle.numberOfLikes = 100 ;

    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.numberOfLikes = 0;

    await newArticle.save();  //save in db 
    //res.send("the new article has been stored")
    res.json(newArticle);

    
 });

 app.get("/articles", async (req, res)=>{
    const articles = await Article.find();
    console.log("the articles are", articles);
    res.json(articles);

 });

 app.get("/articles/:id", async (req, res)=>{
    const id = req.params.id ;

    try {
        const article = await Article.findById(id);
        res.json(article);
        return;
        
    } catch (error) {
        console.log("error while reading article of id", id);
        return res.send("error");
        
    };
   
    
   

 });

 app.delete("/articles/:id",async (req, res)=>{
    const id = req.params.id;

    try {
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        return;
        
    } catch (error) {
        console.log("error while reading article of id", id);
        return res.json("error");
        
        
    }
 });

 app.get("/showArticles", async (req, res)=>{
    const articles = await Article.find()
    res.render("articles.ejs", {
        allArticles: articles

    })


 });



app.listen(3000, ()=>{
    console.log("I am listening in prot 3000")
});