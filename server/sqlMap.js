//sqlMap.js
var sqlMap = {
    user: {
      login: 'select * from user where sno= ? and scode= ? ', //查找用户信息
      add:'insert into user(sno,sname,ssex,snum,scode) values(?,?,?,?,?)',
      snoSearch:'select sno from user where sno= ?',
      MsgSearch:'select sno,sname,ssex,snum from user where sno= ?'
    },
    admin: {
      login: 'select * from admin where ano= ? and acode= ? ', //查找管理员信息
    },
    book:{
      view:'select bno,bname,bgrade,bcover from book ',
      detail:'select * from book where bno= ? ',
      all:'select * from book ',
      delete:'delete from book where bno= ? ',
      bnoSearch:'select bno from book where bno= ?',
      add:'insert into book(bno,bname,bwriter,bpub,bdate,bpage,bgrade,brief,bcover,bword) values(?,?,?,?,?,?,?,?,?,?)'
    },
    comment:{
      add:'insert into comment(cbno,csno,csname,comment,cdate) values(?,?,?,?,?)',
      search:'select * from comment where cbno= ?  ORDER BY cdate DESC',
      delete:'delete from comment where cbno= ? '
    }
  }
  module.exports = sqlMap;