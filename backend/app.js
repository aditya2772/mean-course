const express = require('express');
const bodyParser = require("body-parser");
const mongooose = require('mongoose');
const Post = require('./models/post');
const app = express();

mongooose.connect("mongodb+srv://Aditya:Aditya1420@cluster0.f50qp.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
  console.log("connect successfully");
})
.catch((err)=>{
  console.log("connection failed");
  console.log(err);
})




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
})

//add data using post
app.post("/api/posts",(req,res,next)=>{
  const post= Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: "post added successfully",
      //dynamically adding the id to the posts
      postId: createdPost._id
    });
  });


})

//feteching data useing get request

app.get('/api/posts',(req,res,next)=>{
 Post.find().then(documents =>{
  res.status(200).json({
    message:"posts fetch successfully",
    posts:documents
  });
 });


});

//deleting route  the post
app.delete('/api/posts/:id',(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"post deleted"});
  });
});


module.exports= app;
