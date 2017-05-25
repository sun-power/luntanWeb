var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/list",function(req,res){
  res.render("tiezi");
});
router.post('/add',function(req,res){
  var c=req.body.content;
  var sql = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:'root',
    password:'123456',
    database:'mydata'
  });
  sql.connect();
  sql.query("insert into tiezi(content) value(?)",[c],function(err,data){
    console.log(data);
    res.json(data);
  });
  sql.end();
});
router.get('/look',function(req,res){
  var sql = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:'root',
    password:'123456',
    database:'mydata'
  });
  sql.connect();
  sql.query("select * from tiezi",function(err,data){
    console.log(data);
    res.render("info",{row:data[0]})
  });
  sql.end();
});
module.exports = router;
