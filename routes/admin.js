var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/admin');
});
//查询显示版块信息
router.get('/bkInfo',function(req,res){
  var sql=mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from bkinfo',function(err,data){
    //console.log(data);
    res.render('admin/bkinfo',{info:data});
  });
  sql.end();
});
//增加版块信息
router.get('/addbk',function(req,res){
  res.render('admin/addbk');
});
router.get('/addbkCheck',function(req,res){
  var bk_name = req.query.bk_name;
  var bk_author = req.query.bk_author;
  var sql=mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('insert into bkinfo(bk_name,use_name) values(?,?)',[bk_name,bk_author],function(err,data){
    //console.log(data);
    if(data.affectedRows>0){
      res.redirect('/admin/bkInfo');
    }
  });
  sql.end();
});
//修改版块信息
router.get('/updatebk/:id',function(req,res){
  console.log(req.params.id);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from bkinfo where id=?',[req.params.id],function(err,data){
    //console.log(data);
    res.render("admin/updatebk",{info:data[0]})
  });
  sql.end();
});
router.get('/updatebkCheck',function(req,res){
  var id = req.query.id;
  var bkAuthor = req.query.bk_author;
  var bkName = req.query.bk_name;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('update bkinfo set bk_name=?,use_name=? where id=?',[bkName,bkAuthor,id],function(err,data){
    //console.log(data);
    if (data.affectedRows>0){
      res.redirect('/admin/bkInfo');
    }
  });
  sql.end();
});
//删除版块信息
router.get('/deletebk/:id',function(req,res){
  //console.log(req.params.id);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('delete from bkinfo where id=?',[req.params.id],function(err,data){
    console.log(data);
    if(data.affectedRows>0){
      res.redirect('/admin/bkInfo');
    }
  });
  sql.end();
});
//查看所有帖子信息
router.get('/noteInfo',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from noteinfo limit 0,3',function(err,data){
    //console.log(data);
    res.render('admin/noteinfo',{info:data});
  });
  sql.end();
});
router.post('/noteInfo1',function(req,res){
  var num = req.body.num;
  console.log(num);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from noteinfo limit ?,3',[(num-1)*3],function(err,data){
    //console.log(data);
    res.json(data);
  });
  sql.end();
});
//增加帖子
router.get('/addnote',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from bkinfo',function(err,data){
    console.log(data);
    res.render('admin/addnote',{info:data});
  });
  sql.end();
});
router.get('/addnoteCheck',function(req,res){
  var id = req.query.id;
  var note_name = req.query.note_name;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('insert into noteinfo(id,note_name) values(?,?)',[id,note_name],function(err,data){
    console.log(data);
    if(data.affectedRows>0){
      res.redirect('/admin/noteInfo');
    }
  });
  sql.end();
});
//修改帖子信息
router.get('/updatenote/:id',function(req,res){
  //console.log(req.params.id);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from noteinfo where note_id=?',[req.params.id],function(err,data){
    //console.log(data);
    res.render("admin/updatenote",{info:data[0]})
  });
  sql.end();
});
router.get('/updatenoteCheck',function(req,res){
  var id = req.query.id;
  var note_name = req.query.note_name;
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('update noteinfo set note_name=? where note_id=?',[note_name,id],function(err,data){
    //console.log(data);
    if (data.affectedRows>0){
      res.redirect('/admin/noteInfo');
    }
  });
  sql.end();
});
//删除帖子信息
router.get('/deletenote/:id',function(req,res){
  //console.log(req.params.id);
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('delete from noteinfo where note_id=?',[req.params.id],function(err,data){
    //console.log(data);
    if(data.affectedRows>0){
      res.redirect("/admin/noteInfo");
    }
  });
  sql.end();
});
//查询所有用户信息
router.get('/useInfo',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from useinfo',function(err,data){
    //console.log(data);
    res.render('admin/useinfo',{useinfo:data});
  });
  sql.end();
});
//增加用户信息
router.get('/adduse',function(req,res){
  res.render('admin/adduse');
});
router.get('/adduseCheck',function(req,res){
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
    //console.log(data);
    if (data.affectedRows>0){
      res.redirect('/admin/useInfo');
    }
  });
  sql.end();
});
//修改用户信息
router.get('/updateuse/:id',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('select * from useinfo where use_id=?',[req.params.id],function(err,data){
    console.log(data);
    res.render('admin/updateuse',{info:data[0]});
  });
  sql.end();
});
router.get('/updateuseCheck',function(req,res){
  var use_id = req.query.use_id;
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
  sql.query('update useinfo set use_name=?,use_password=?,use_repassword=? where use_id=?',[use_name,use_password,use_repassword,use_id],function(err,data){
    console.log(data);
    res.redirect('/admin/useInfo');
  });
  sql.end();
});
//删除用户信息
router.get('/deleteuse/:id',function(req,res){
  var sql = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123456',
    database:'forum'
  });
  sql.connect();
  sql.query('delete from useinfo where use_id=?',[req.params.id],function(err,data){
    console.log(data);
    if(data.affectedRows>0){
      res.redirect('/admin/useInfo');
    }
  });
  sql.end();
});
module.exports = router;
