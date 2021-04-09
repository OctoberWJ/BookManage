<!-- 用户书籍页面 -->
<template>
    <div class='mainbox'>
        <top style="position:absolute;top:0;"></top>
        <div id="content">
            <div style="height:90px;"></div>
            <span id='tit'>书/籍/库</span>
            <div id="search">
                <input type="text" v-model="input" placeholder="请输入搜索书籍名">
                <i class="el-icon-search" style="cursor: pointer;margin-left:10px" @click="Search"></i>
            </div>
            <ul id="book">
                <li v-for="(item,index) in books.filter(
                    data => !search || 
                    data.bname.toLowerCase().includes(search.toLowerCase())).slice(
                    (currentPage-1)*pagesize,currentPage*pagesize)" :key="index"
                    @click="GoDetail(item.bno)">
                    <img :src="require('../../../static/bookImg/'+item.bcover)" >
                    <span>{{item.bname}}</span>
                    <el-rate
                        v-model="item.bgrade"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                </li>
            </ul>
            <el-pagination 
            :hide-on-single-page="books.length<pagesize"
            background
            :pageSize="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="books.filter(data => !search || 
            data.bname.toLowerCase().includes(search.toLowerCase())).length"
            @current-change="pageChange"
            class="page">
            </el-pagination>
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
            input:'',
            search:'',
            books:[],
            currentPage:1,
            pagesize:10,
        }
    },
    methods:{
        pageChange(val){
            this.currentPage = val;
        },
        GoDetail(bno){
            this.$router.push({
                path:'/user/bookDetail',
                query: {
                    id:bno
                }
            });
        },
        Search(){
            this.search=this.input;
        }
    },
    mounted() {
        var that= this;
        this.$http.post('/api/user/bookView', {})
        .then((response) => {
            var data=response.body;
            that.books=data;
        })
    }
}
</script>
<style scoped>
.mainbox{
    width:100%;
    height:100%;
    background-color: rgb(155, 200, 240);
    position: relative;
}
#content{
    width:70%;
    height:100%;
    margin:0 auto;
    background-color: white;
    box-shadow: 0px 0px 5px #bebebe;
}
#tit{
    display:block;
    width:100%;
    color:rgb(37, 150, 248);
    letter-spacing: 5px;
    font-size:24px;
    font-weight: 500;
    margin-bottom:30px;
}
#search{
    font-size: 20px;
    text-align: left;
    margin-left:10%;
    margin-bottom:10px;
    line-height: 30px;
}
#search input{
    width:300px;
    height:30px;
    font-size: 16px;
    border:1px solid rgb(37, 150, 248);
    outline: none;
    border-radius: 20px;
    text-indent: 20px;
}
#book{
    width:80%;
    margin:0 auto;
    list-style: none;
    padding:0;
    height:680px;
}
#book li{
    width:17%;
    margin:20px 1.5%;
    float: left;
    height:293.55px;
    cursor: pointer;
}
#book li img{
    width:100%;
}
#book li span{
    display: block;
    margin:10px 0;
}
.page{
    width:100%;
    text-align: center;
}
</style>