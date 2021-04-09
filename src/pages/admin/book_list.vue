<template>
  <!-- 主要内容 -->
  <div id="mainbox">
    <topAdmin></topAdmin>
    <div id="Managebox">
      <div  id="search">
        <input type="text"  placeholder="输入关键词" v-model="input">
        <el-button type="primary" @click="search=input">搜索</el-button>
        <router-link :to="'/admin/bookAdd'" id="zhengjia" type="primary" style="margin-left:20px">   
          <span>增加</span>
        </router-link>
      </div>
      <el-table :data="data.filter(data => !search || 
            data.bname.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column
          prop="bname"
          label="书名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="bwriter"
          label="作者名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="bpub"
          label="出版社"
          align="center">
        </el-table-column>
        <el-table-column
          prop="bdate"
          label="出版年月"
          align="center">
        </el-table-column>
        <el-table-column
          prop="bgrade"
          label="评分"
          align="center">
            <template slot-scope="scope">
                <el-rate
                v-model="scope.row.bgrade"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
                </el-rate>
            </template>
        </el-table-column>
        <el-table-column label="操作"
          align="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        :total="data.filter(data => !search || 
            data.bname.toLowerCase().includes(search.toLowerCase())).length"
        @current-change="handleCurrentChange"
         style="margin:50px 0 0 0;text-align:center;">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import topAdmin from '../../components/topAdmin.vue'

axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证
export default {
    components:{
        topAdmin:topAdmin
    },
    data () {
        return {
            search:'',
            input:'',
            data:[],
            currentPage:1,
            pagesize:10,
            // dialogVisible: false,
            form:{
                bno:'',
                bname:'',
                bwriter:'',
                bpub:'',
                bdate:'',
                bpage:'',
                bgrade:'',
                brief:'',
                bcover:'',
                bword:''
            },
            rules:{
                bno:[
                    { required: true, message: '请输入书号', trigger: 'blur' }
                ],
                bname:[
                    { required: true, message: '请输入书名', trigger: 'blur' }
                ],
                bgrade:[
                    { required: true, message: '请输入评分', trigger: 'blur' }
                ]
            },
            dialogImageUrl: '',
            ImgVisible: false,
            disabled: false,
            fileList:[],
            ImgList:[]
        }
    },
    methods: {
        getInfo(){
            const that=this;
            this.$http.post('/api/admin/bookList', {})
            .then((response) => {
                var data=response.body;
                that.data=data;
            })
        },
        handleCurrentChange(val){
		      this.currentPage = val;
        },
        handleDelete(index, row) {
            const that=this;
            this.$http.post('/api/admin/deleteBook', {
                bno:row.bno
            })
            .then((response) => {
              that.$http.post('/api/admin/deleteComment', {
                cbno:row.bno
              })
              .then((response) => {
                var data=response.body;
                that.getInfo();
                that.$message({
                  message: '删除成功',
                  type: 'success'
                });
              })
            })
        },
        handleClose(done) {
            this.$confirm('确认取消增加？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        submitForm(formName) {
            var that=this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(that.$refs.uploadImg.uploadFiles.length!=0&&that.$refs.uploadWord.uploadFiles.length!=0){
                    that.form.bcover=that.$refs.uploadImg.uploadFiles[0].name;
                    that.form.bword=that.$refs.uploadWord.uploadFiles[0].name;
                    that.$http.post('/api/admin/bnoSearch', {
                        bno:that.form.bno
                    })
                    .then((response) => {
                        console.log(response)
                        var data=response.body;
                        if(data.length==0){
                           that.$http.post('/api/admin/addBook', that.form)
                            .then((response) => {
                        console.log(response)
                                var data=response.body;
                                that.$message({
                                    message: '增加成功',
                                    type: 'success'
                                });
                                that.dialogVisible = false;
                                that.form={bno:'',bname:'',bwriter:'',bpub:'',bdate:'',bpage:'',bgrade:'',brief:'',bcover:'',bword:''};
                                that.$refs.uploadImg.uploadFiles[0]={};
                                that.$refs.uploadWord.uploadFiles[0]={};
                                that.getInfo();
                            }) 
                        }else{
                            that.$message.error('该书号已被注册');
                        }
                    })
                }else{
                    that.$message.error('请输入完整的信息');
                }
            } else {
                that.$message.error('请输入完整的信息');
                return false;
            }
            });
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.ImgVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleImgRemove() {
            this.$refs.uploadImg.uploadFiles[0]={};
        },
        beforeImgRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    },
    mounted:function(){
      this.getInfo();
    }
}


</script>

<style scoped>
#mainbox {
  width: 100%;
  height:100%;
  position: relative;
}
#Managebox{
  margin:0 80px;
  text-align: left;
}
#search{
  height:38px;
  margin-top:40px;
}
#search input{
  width:240px;
  height:26px;
  border:1px solid #e6e4e4;
  border-radius: 5px;
  margin:4px 0;
  text-indent: 10px;
}
#search input::-ms-input-placeholder{
  text-align: center;
}
#search input::-webkit-input-placeholder{
  text-align: center;
}
#mainbox /deep/ .el-button--primary{
  padding:8px 13px;
  background-color: #4A7FE1;
}
#Managebox /deep/ .el-table{
  width: 100%;
  min-height:500px;
  box-shadow: 0px 0px 5px #bebebe;
  margin-top:20px;
}
#Managebox /deep/ .el-table th.is-leaf {
  background-color: #77ADFF;
  font-size: 16px;
  color:black;
  font-weight: normal;
}
#Managebox /deep/ .el-table__row:nth-child(even) {
     background-color: #F7F7F7;
}
#Managebox /deep/ .el-table__row:nth-child(odd) {
     background-color: #FFFFFF;
}
#mainbox /deep/ .el-dialog__header{
  text-align: left;
  background-color: rgb(235, 235, 235);
  font-size: 16px;
  color:black;
  font-weight:bold;
}
#desc{
    width:95%;
    height:100px;
    outline: none;
    resize: none;
    border:#DCDFE6 solid 1px;
    padding:10px;
    border-radius: 10px;
    font-size:15px;
}
#zhengjia{
  color:white;
  padding:8px 13px;
  background-color: #4A7FE1;
  text-decoration: none;
  border-radius: 5px;
  font-size:14px;
}
</style>
