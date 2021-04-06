const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

const users = [];

app.get("/users", function(req, res){
    res.json(users);
});

app.post("/users", function(req, res){
    try{
        const salt = await.bcrypt.genSalt();
        const hashedPassword = await.bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = {name: req.body.name, password: hashedPassword};
        users.push(user);
        res.status(201).send();
    }
    catch{
        res.status(500).send();
    }
    
});

app.listen(3000, function(req, res){
    console.log("Running on port 3000");
});


/*
require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const posts = [
    {
        username: "Asif",
        title: "Post 1"
    },
    {
        username: "Rohit",
        title: "Post 2"
    }
];

app.get("/posts", authenticateToken, (req, res) => {
    //console.log(req);
    res.json(posts.filter(post => post.username === req.user.name));
    //res.json(posts);
});

app.post("/login", function(req, res){
    //Aunthenticate User
    //var elements;
    var username = req.body.username;
    console.log(username);
    // const user = { name: username};
    // const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    // res.json({accessToken: accessToken});
    posts.forEach(function(elements){
        console.log(elements);
        console.log(elements.username);
    });

    // var i;
    // for(i = 0; i < posts.length; i++){
    //     console.log(posts[i]);
    // }

    // var ar = posts.toString();
    // console.log(ar);

    for(i = 0; i < posts.length; i++){
        var uname = Object(posts[i].username);
        console.log(Object(posts[i].username));
        
    }

    //console.log(Object(posts[0].username));
    //var uname = Object(posts[0].username);

    if(username===undefined || uname!=req.body.username){
        res.json({message: "User not found!"});
    }
    else{
        const user = { name: username};
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
    }
    // if(posts.includes({"username": "Asif"}, posts.length)){
    //     const user = { name: username};
    //     const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    //     res.json({accessToken: accessToken});
    // }
    // else{
    //     res.json({message: "User not found!"});
    // }
    // if(username == null || posts ){
    //     res.json({message: "User not found!"});
    // }
    

});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user){
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.listen(3000, function(req, res){
    console.log("Running on port 3000");
});
*/