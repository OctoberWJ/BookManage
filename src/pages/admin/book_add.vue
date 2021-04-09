<template>
  <div>
    <top style="position:absolute;top:-73px;z-index:1;"></top>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules"
      style="text-align:left;width:70%;margin:73px 15% 0 15%;">
        <el-form-item label="书号：" prop="bno">
          <el-input v-model="form.bno"></el-input>
        </el-form-item>
        <el-form-item label="书名：" prop="bname">
          <el-input v-model="form.bname"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <el-input v-model="form.bwriter"></el-input>
        </el-form-item>
        <el-form-item label="出版社：">
          <el-input v-model="form.bpub"></el-input>
        </el-form-item>
        <el-form-item label="出版年月：">
          <el-input v-model="form.bdate"></el-input>
        </el-form-item>
        <el-form-item label="页数：">
          <el-input v-model="form.bpage"></el-input>
        </el-form-item>
        <el-form-item label="评分：" prop="bgrade">
          <el-input v-model="form.bgrade"></el-input>
        </el-form-item>
        <el-form-item label="简介：" style="height:130px">
            <textarea v-model="form.brief" id="desc"  placeholder="请输入，至多300字。"></textarea>
        </el-form-item>
        <el-form-item label="图片：" style="height:130px">
        <el-upload
        action="#"
        :limit='1'
        list-type="picture-card"
        :auto-upload="false"
        :on-remove="handleImgRemove"
        :before-remove="beforeImgRemove"
        :file-list="ImgList"
        ref="uploadImg">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                    <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleImgRemove()">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        </el-form-item>
        <el-form-item label="文档上传：" style="height:130px">
            <el-upload
            class="upload-demo"
            action="#"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit='1'
            :auto-upload="false"
            ref="uploadWord"
            :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <router-link :to="'/admin/bookList'">
        <el-button>取消</el-button>
      </router-link> 
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
    </span>

  </div>
</template>

<script>
import top from "../../components/top";
export default {
  name: "book_add",
  components: {
    top
  },
  data () {
        return {
            data:[],
            currentPage:1,
            pagesize:10,
            dialogVisible: false,
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
.el-form-item {
    margin-bottom: 11px;
    margin-top: 20px;
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
  border: 1px solid #DCDFE6;
  text-decoration: none;
  border-radius: 5px;
  font-size:14px;
}
</style>