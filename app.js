//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Check out the posts from my journey to South East Asia!";
const aboutContent =
  "Welcom everyone! My name is Cool Traveller and his is my main blog. I post about my everyday adventures, while travelling around the world.";
const contactContent =
  "For any enquiries please contact me!";

const app = express();

const posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
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

app.get("/posts/:title", (req, res) => {
  const requestedTitle = req.params.title;
  posts.forEach(post => {
    const storedTitle = post.title; //assign each title to storedTitle to compare it later
    if (_.lowerCase(storedTitle) === _.lowerCase(requestedTitle)) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.newTitle,
    content: req.body.newBody
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
