<!-- 书籍详情页面 -->
<template>
    <div class='mainbox'>
        <top style="position:absolute;top:0;"></top>
        <div id="content">
            <div style="height:90px;"></div>
            <router-link to="/user/bookstore" id='back'>
                <i class='el-icon-arrow-left'></i>
                <span>返回</span>
            </router-link>

            <span id='tit'>{{book.bname}}</span>
            <div id="box">
                <img :src="require('../../../static/bookImg/'+book.bcover)">
                <el-form ref="form" :model="book" label-width="150px">
                    <el-form-item label="作者:">
                        <span>{{book.bwriter}}</span>
                    </el-form-item>
                    <el-form-item label="出版社:">
                        <span>{{book.bpub}}</span>
                    </el-form-item>
                    <el-form-item label="出版年月:">
                        <span>{{book.bdate}}</span>
                    </el-form-item>
                    <el-form-item label="页数:">
                        <span>{{book.bpage}}</span>
                    </el-form-item>
                    <el-form-item label="下载:">
                        <a :href="'../../../static/word/'+book.bword" :download="book.bword" @click="downloadNum">{{book.bword}}</a>
                    </el-form-item>
                </el-form>
                <span id="tit1">简介：</span>
                <span id="rief">{{book.brief}}</span>
            </div>
            <div id="comment">
                <span id="tit2">讨论区：</span>
                <div id="myComment">
                    <textarea v-model="comment" id="desc"  placeholder="请输入，至多50字。"></textarea>
                    <span @click="addComment">发表评论</span>
                </div>
                <div id="allComment">
                    <ul>
                        <li v-for="(item,index) in commentList.slice(
                    (currentPage-1)*pagesize,currentPage*pagesize)" :key="index">
                            <span id="name" @click="getReaderInfo(item.csno)">{{item.csname}}:</span>
                            <span id="ct">{{item.comment}}</span>
                            <span id="cdate">{{item.cdate}}</span>
                        </li>
                    </ul>
                    <el-pagination
                    :hide-on-single-page="commentList.length<pagesize"
                    :pageSize="pagesize"
                    layout="total, prev, pager, next"
                    :total="commentList.length"
                    @current-change="pageChange"
                    class="page">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from '../../components/top.vue'
export default {
    components:{
        top:top
    },
    data() {
        return {
            book:{},
            comment:'',
            user:{
                sno:'',
                sname:''
            },
            commentList:[],
            currentPage:1,
            pagesize:4,
            count:0
        }
    },
    methods:{
        getDate() {
            var myDate = new Date()
            var year = myDate.getFullYear()
            var month = myDate.getMonth() + 1
            var date = myDate.getDate()
            var h = myDate.getHours()
            var m = myDate.getMinutes()
            var s = myDate.getSeconds()
            var time =year +
            '-' +this.convert(month) +
            '-' +this.convert(date) +
            ' ' +this.convert(h) +
            ':' +this.convert(m) +
            ':' +this.convert(s)
            return time
        },
        convert(val) {
            return val < 10 ? '0' + val : val
        },
        GetUser () {
            this.user.sname = this.getCookie('username');
            this.user.sno = this.getCookie('num');
        },
        addComment(){
            var that= this;
            if(this.comment!=''){
                var time=this.getDate();
                this.$http.post('/api/user/addComment', {
                    cbno:that.book.bno,
                    csno:that.user.sno,
                    comment:that.comment,
                    csname:that.user.sname,
                    cdate:time,
                })
                .then((response) => {
                    that.$message({
                        message: '发表成功！',
                        type: 'success'
                    });
                    that.getComment();
                })
            }else{
                that.$message.error('发表内容不能为空!');
            }
        },
        getComment(){
            var that= this;
            this.$http.post('/api/user/SearchComment', {
                cbno:that.$route.query.id,
            })
            .then((response) => {
                var data=response.body;
                that.commentList=data;
            })
        },
        pageChange(val){
            this.currentPage = val;
        },
        getReaderInfo(csno){
            var that =this
            this.$router.push({
                path:'/user/readerInfo',
                query: {
                    id:that.$route.query.id,
                    sno:csno
                }
            });
        }
    },
    mounted() {
        var that= this;
        this.$http.post('/api/user/bookDetail', {
            bno:that.$route.query.id,
        })
        .then((response) => {
            var data=response.body;
            that.book=data[0];
        })
        this.GetUser();
        this.getComment();
    },

}
</script>
<style scoped>
a{
    color:rgb(102, 158, 241)
}
.mainbox{
    width:100%;
    min-height:100%;
    background-color: rgb(155, 200, 240);
    position: relative;
}
#content{
    width:70%;
    margin:0 auto;
    background-color: white;
    box-shadow: 0px 0px 5px #bebebe;
}
#back{
    font-size:20px;
    color:rgb(19, 68, 43);
    text-decoration: none;
    position: absolute;
    left:18%;
    top:90px;
}
#tit{
    display:block;
    width:100%;
    color:rgb(15, 112, 80);
    letter-spacing: 5px;
    font-size:24px;
    font-weight: 500;
    margin-bottom:30px;
}
#box{
    width:80%;
    margin:0 auto;
    min-height:680px;
    text-align: left;
    position: relative;
}
#box img{
    float: left;
    width:30%;
    margin-right:10%;
}
#box /deep/ .el-form{
    width:60%;
    float: left;
    text-align: left;
    margin:60px 0 33.34px 0;
}
#box /deep/ .el-form-item__content,#box /deep/ .el-form-item__label{
    font-size:18px;
    letter-spacing: 3px;
}
#rief,#tit1{
    width:100%;
    float: left;
    font-size:18px;
    letter-spacing: 1px;
    display: block;
}
#tit1{
    margin-top:60px;
    color:rgb(29, 99, 156);
}
#rief{
    margin-top:30px;
}
#comment{
    width:80%;
    min-height:900px;
    margin:0 auto;
    border-radius: 20px 20px 0 0;
    background-color: rgb(228, 237, 240);
    padding-bottom:40px;
}
#tit2{
    display: block;
    float: left;
    width:100%;
    text-align: left;
    margin:20px;
    font-weight:600;
    font-size:19px;
}
#myComment{
    width:90%;
    background-color: white;
    margin:10px 5%;
    border-radius:10px ;
    float: left;
    position: relative;
}
#myComment span{
    width: 100px;
	height: 35px;
    color: rgba(255, 255, 255, 1);
	background-color: rgba(108, 138, 216, 1);
	border-radius: 10px;
	font-size: 14px;
	line-height: 35px;
	text-align: center;
    cursor: pointer;
    display: block;
    margin:0 0 20px 87%;

}
#desc{
    width:94%;
    margin:20px auto;
    display: block;
    height:100px;
    outline: none;
    resize: none;
    border:#DCDFE6 solid 1px;
    padding:10px;
    border-radius: 10px;
    font-size:15px;
}
#allComment{
    width:90%;
    min-height:600px;
    background-color: white;
    margin:10px 5%;
    border-radius:10px ;
    border-radius: 15px;
    float: left;
    position: relative;
}
#allComment ul{
    width:94%;
    height:500px;
    padding:0;
    list-style: none;
    margin:30px 3% 0 3%;
}
#allComment ul li{
    width:100%;
    height:110px;
    margin:15px 0;
    border-radius: 10px;
    position: relative;
}
#name{
    position: absolute;
    top:10px;
    left:10px;
    font-size:16px;
    font-weight:700;
}
#ct{
    width:90%;
    height:90px;
    position: absolute;
    left:70px;
    padding:10px;
    border-radius: 10px;
    text-align: left;
    font-size:15px;
    font-weight:400;
    background-color: rgb(228, 237, 240);
}
#cdate{
    position: absolute;
    color:#888787;
    right:20px;
    bottom:10px;
}
.page{
    width:100%;
    text-align: center;
}
</style>
