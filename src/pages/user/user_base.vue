<template>
  <div id="user_base">
    <topCopy style="position:absolute;top:0;z-index:1;"></topCopy>
    <div id="mainbox">
      <router-link :to="'/user/bookstore?id='+$route.query.id" id="back">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </router-link>
      <el-form ref="form" :model="form" label-width="80px">
        <span style="margin-bottom:50px;display:block;">个人信息</span>
        <el-form-item label="姓名:">
          <span>{{form.sname}}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{form.ssex}}</span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span>{{form.snum}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import topCopy from "../../components/topCopy";

export default {
  name: "user_base",
  components: {
    topCopy
  },
  data() {
    return {
      user: [],
      form: {
        sname: "",
        ssex: "",
        snum: ""
      }
    };
  },
  mounted() {
    this.UserLogin()
  },
  methods: {
    UserLogin() {
      var that = this;
      var password = this.getCookie("password");
      var username = this.getCookie("num");
      this.$http
        .post("/api/user/login", {
          username: username,
          password: password
        })
        .then(response => {
          var data = response.body;
          if (data.length != 0) {
            this.form = data[0];
          } else {
            that.$message.error("请先登录");
          }
        });
    }
  }
};
</script>

<style scoped>
#user_base {
  width: 100%;
  height: 100%;
  background-color: rgb(155, 200, 240);
  position: relative;
}
.content {
  width: 70%;
  height: 100%;
  margin: 0 auto;
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
#tit {
  display: block;
  width: 100%;
  color: rgb(15, 112, 80);
  letter-spacing: 5px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
}
#box {
  position: absolute;
  left: 22%;
  top: 220px;
  font-size: 17px;
}
.formInfo {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 17px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#mainbox {
  width: 80%;
  min-height: 100%;
  position: relative;
  background-color: white;
  margin: 0 auto;
  z-index: 0;
}
#mainbox form {
  width: 300px;
  margin: 0 auto;
  padding: 100px 0 50px 0;
}
</style>
