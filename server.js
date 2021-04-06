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
    },
    {
        username: "Abc",
        title: "Post 3"
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
    //var username = req.body.username;
    //console.log(username);
    // const user = { name: username};
    // const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    // res.json({accessToken: accessToken});
    let flag;
    posts.forEach(function(elements){
        //flag = false;
        //console.log(elements);
        //console.log(req.body.username);
        console.log(elements.username);

        if(req.body.username === elements.username){
            flag = true;
            console.log(flag);
            //res.json({message: "User not found!"});
            //console.log("User not found!");
        }
    });
    if(flag == true){
        const user = { name: req.body.username};
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
    }
    else{
        console.log("User not found");
        res.json({message: "User not found!"});
    }

    // var i;
    // for(i = 0; i < posts.length; i++){
    //     console.log(posts[i]);
    // }

    // var ar = posts.toString();
    // console.log(ar);
    /*let flag;
    console.log(req.body.username);
    for(let i = 0; i < posts.length; i++){
        flag = false;
        var uname = Object(posts[i].username);
        console.log(uname);
        
        if(req.body.username === undefined || req.body.username != uname){
            flag = true;
            //res.json({message: "User not found!"});
        }
    }
    if(flag == true){
        console.log(flag);
        res.json({message: "User not found!"});
    }
    else{
        const user = { name: req.body.username};
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
    }*/
    //console.log(Object(posts[0].username));
    //var uname = Object(posts[0].username);

    
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
