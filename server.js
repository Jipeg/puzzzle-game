const fs = require("fs")
const express = require('express')
const app = express()
const path = require('path');

app.use(express.static("public"));

app.get('/game', (req, res) => {
  var set = req.query.set
  console.log("Using a pic number "+set)
  fs.readdir("./public/pics/"+set, (err, files) => {
    var total = files.length;
    res.sendFile(path.join(__dirname+'/public/game.html'));
    res.redirect('/game.html?set='+set+'&total='+total);
  });
  
});


app.get('/newgame', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/newgame.html'));
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})