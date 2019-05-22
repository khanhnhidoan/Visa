var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");
var pg = require('pg');
var server = require("http").Server(app);
server.listen(3000);

var config = {
      user:'postgres',
      database:'chucmunggiangsinh',
      password:'123',
      host: 'localhost',
      post: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
    };

    var pool = new pg.Pool(config);

app.get("/", function(req, res){
    pool.connect(function(err, client, done){
        if (err) {
            return console.error('loi roi');
        }
        client.query('select * from video', function(err, result){
            done();
            if (err) {
                res.end();
                return console.error('loi chay query', err);
            }
            res.render("home", {data:result});
        });

    });
   
});

app.get("/video/list", function(req, res){
    pool.connect(function(err, client, done){
        if (err) {
            return console.error('loi roi');
        }
        client.query('select * from video', function(err, result){
            done();
            if (err) {
                res.end();
                return console.error('loi chay query', err);
            }
            res.render("list", {data:result});
        });

    });
})

app.get("/video/delete/:id", function(req, res){
    // res.send(req.params.id);
    pool.connect(function(err, client, done){
        if (err) {
            return console.error('loi roi');
        }
        client.query('delete from video where id = ' + req.params.id, function(err, result){
            done();
            if (err) {
                res.end();
                return console.error('loi chay query', err);
            }
            res.redirect("../list");
        });

    });
})

app.get("/video/add/", function(req, res){
    res.render("add");
    
})
