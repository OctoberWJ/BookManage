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
  var sql = $sql.admin.login;
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

// 查询书籍列表接口
router.post('/bookList', (req, res) => {
  var sql = $sql.book.all;
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

// 删除书籍接口
router.post('/deleteBook', (req, res) => {
  var sql = $sql.book.delete;
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

//  删除对应书籍的评论接口
router.post('/deleteComment', (req, res) => {
  var sql = $sql.comment.delete;
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

// 注册接口
router.post('/addBook', (req, res) => {
  var sql = $sql.book.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.bno, params.bname, params.bwriter, params.bpub, params.bdate, params.bpage, params.bgrade, params.brief, params.bcover, params.bword], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

// 查询书号是否已注册
router.post('/bnoSearch', (req, res) => {
  var sql = $sql.book.bnoSearch;
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

module.exports = router
