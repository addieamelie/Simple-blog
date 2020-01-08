//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Check out the posts from my journey to South East Asia!";
const aboutContent =
  "Welcom everyone! My name is Cool Traveller and his is my main blog. I post about my everyday adventures, while travelling around the world.";
const contactContent = "For any enquiries please contact me!";

const app = express();

let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  //to connect to MongoDB Atlas change to your own url
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, (err, post) =>{
    res.render("post", {
      title: post.title,
      content: post.content
   });
  });
});

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.newTitle,
    content: req.body.newBody
  });
  post.save(err => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
