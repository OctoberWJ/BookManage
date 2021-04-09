var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 登录接口
router.post('/login', (req, res) => {
  var sql = $sql.user.login;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.username, params.password], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 注册接口
router.post('/register', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.sno, params.sname, params.ssex, params.snum, params.scode], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 查询账号是否已注册
router.post('/snoSearch', (req, res) => {
  var sql = $sql.user.snoSearch;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.sno], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 书架接口
router.post('/bookView', (req, res) => {
  var sql = $sql.book.view;
  var params = req.body;
  console.log(params);
  conn.query(sql, [], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 书本详情接口
router.post('/bookDetail', (req, res) => {
  var sql = $sql.book.detail;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.bno], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 发表评论接口
router.post('/addComment', (req, res) => {
  var sql = $sql.comment.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.cbno,params.csno,params.csname,params.comment,params.cdate], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 获取评论接口
router.post('/SearchComment', (req, res) => {
  var sql = $sql.comment.search;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.cbno], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 获取评论者信息
router.post('/ReaderMsg', (req, res) => {
  var sql = $sql.user.MsgSearch;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.sno], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})
module.exports = router
