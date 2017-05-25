var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
/* GET home page. */
//查询所有的版块信息
router.get('/', function(req, res, next) {
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  var sqls = {
    bk:'select * from bkinfo',
    note:'select * from noteinfo'
  };
  async.map(sqls, function(item, callback) {
    sql.query(item, function(err, results) {
      callback(err, results);
    });
  }, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      //console.log(results);
      res.render('view/index',{bk:results[0],note:results[1]})
    }
    sql.end();
  });
});
//登录
router.get('/login',function(req,res){
  res.render('view/login',{title:'亲爱的会员欢迎回来！'});
});
router.post('/loginCheck',function(req,res){
  var name = req.body.name;
  var password = req.body.password;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from useinfo where use_name = ? and use_password = ?',[name,password],function(err,data){
    console.log(data);
    if(data[0] == null){
      res.render('view/login',{title:'用户名和密码验证失败，请重新登录!!1'})
    }
    else{
      res.redirect('/view/edit');
    }
  });
  sql.end();
});
router.post('/loginCheck1',function(req,res){
  var name = req.body.name;
  var password = req.body.password;
  console.log(name);
  console.log(password);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from useinfo where use_name = ? and use_password = ?',[name,password],function(err,data){
      //console.log(data);
      res.json(data);
  });
  sql.end();
});
//注册
router.get('/register',function(req,res){
  res.render('view/register');
});
router.get('/registerCheck',function(req,res){
  var use_name = req.query.use_name;
  var use_password = req.query.use_password;
  var use_repassword = req.query.use_repassword;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('insert into useinfo(use_name,use_password,use_repassword) values(?,?,?)',[use_name,use_password,use_repassword],function(err,data){
    console.log(data);
    if (data.affectedRows>0){
      res.render('view/login',{title:'注册成功，请登录!'});
    }
  });
  sql.end();
});
router.post('/registerCheck1',function(req,res){
  var use_name = req.body.name;
  console.log(use_name);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from useinfo where use_name = ?',[use_name],function(err,data){
    console.log(data);
    res.json(data);
  });
  sql.end();
});
//新帖
router.get('/noteInfo/:id',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  var sqls = {
    note:'select * from content limit 0,3',
    bk:'select * from bkinfo where id = ?',
    note1:'select * from content limit 0,10'
  };
  async.map(sqls,function(data,callback){
    sql.query(data,[req.params.id],function(err,data){
      callback(err,data);
    })
  },function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      res.render('view/xinTie',{note:data[0],bk:data[1],note1:data[2]})
    }
    sql.end();
  });
});
router.post('/noteInfo1',function(req,res){
  var num = req.body.num;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from content limit ?,3',[(num-1)*3],function(err,data){
    //console.log(data);
    res.json(data);
  });
  sql.end();
});
//发布新帖
router.get('/edit',function(req,res){
  res.render('view/edit');
});
router.post('/addcontent',function(req,res){
  var c = req.body.content;
  var name = req.body.name;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('insert into content(content_name,content_text) values(?,?)',[name,c],function(err,data){
    console.log(data);
    if(!data[0]){
      res.json({'reg':0});
    }else{
      res.json({'reg':1});
    }
  });
  sql.end();
});
//查看帖子内容
router.get('/content/:id',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  var sqls = {
    info:'select * from content where content_id=?',
    pl:'select * from plinfo where content_id = ?',
    bk:'select * from bkinfo'
  };
  async.map(sqls,function(data,callback){
    sql.query(data,[req.params.id],function(err,data){
      callback(err,data);
    })
  },function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      res.render('view/content',{info:data[0][0],pl:data[1],bk:data[2]})
    }
    sql.end();
  });
});
//评论
router.post('/addpl',function(req,res){
  var c = req.body.content;
  var id = req.body.content1;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('insert into plinfo(pl_text,content_id) values(?,?)',[c,id],function(err,data){
    //console.log(data);
  });
  sql.end();
});
//删除评论
router.get('/deletepl/:id',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('delete from plinfo where pl_id = ?',[req.params.id],function(err,data){
  });
  sql.end();
});

module.exports = router;
