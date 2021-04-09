<template>
  <div class="main">
    <div id="bg"></div>
    <div class="mainbox">
      <div id="content">
        <h1>书籍管理平台</h1>
        <input type="text" v-model="username" placeholder="账号" />
        <input type="password" v-model="password" placeholder="密码" />
        <img src="../assets/username.svg" style="top:148px;left:35px;" />
        <img src="../assets/password.svg" style="top:207px;left:35px;" />

        <router-link :to="'/register'" id="zhuche">
          <span>用户注册</span>
        </router-link>

        <div id="identity">
          <label>
            <input name="user" type="radio" v-model="identity" value="user" />用户
          </label>
          <label>
            <input name="admin" type="radio" v-model="identity" value="admin" />管理员
          </label>
        </div>
        <div id="login_btn" @click="Login">登录</div>
      </div>
    </div>
    <!-- <a href="../../static/login_bg.png" download="下载时文件名.png">点击显示名</a> -->
    <el-dialog title="注册" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rules"
        style="text-align:left;width:70%;margin:20px 15% 0 15%;"
      >
        <el-form-item label="账号：" prop="sno">
          <el-input v-model="form.sno"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="sname">
          <el-input v-model="form.sname"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="form.ssex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.snum"></el-input>
        </el-form-item>
        <el-form-item label="设置密码：" prop="scode">
          <el-input type="password" v-model="form.scode"></el-input>
        </el-form-item>
        <el-form-item label="重复密码：" prop="recode">
          <el-input type="password" v-model="form.recode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      identity: "",
      dialogVisible: false,
      form: {
        sno: "",
        sname: "",
        ssex: "",
        snum: "",
        scode: "",
        recode: ""
      },
      rules: {
        sno: [{ required: true, message: "请输入账号", trigger: "blur" }],
        sname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        scode: [{ required: true, message: "请输入密码", trigger: "blur" }],
        recode: [{ required: true, message: "请重复密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // handleClose(done) {
    //   this.$confirm("确认取消注册？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    UserLogin() {
      var that = this;
      this.$http
        .post("/api/user/login", {
          username: that.username,
          password: that.password
        })
        .then(response => {
          var data = response.body;
          console.log(data);
          if (data.length != 0) {
            that.setCookie(
              "username",
              data[0].sname,
              365 * 24 * 60 * 60 * 1000
            );
            that.setCookie("num", data[0].sno, 365 * 24 * 60 * 60 * 1000);
            that.setCookie(
              "password",
              data[0].scode,
              365 * 24 * 60 * 60 * 1000
            );
            that.$message({
              message: "用户" + data[0].sname + "登陆成功！",
              type: "success"
            });
            // that.$router.push("/user/bookstore");
            that.$router.push("/nevigater");
          } else {
            that.$message.error("用户名或密码错误");
          }
        });
    },


    AdminLogin() {
      var that = this;
      this.$http
        .post("/api/admin/login", {
          username: that.username,
          password: that.password
        })
        .then(response => {
          var data = response.body;
          if (data.length != 0) {
            that.setCookie(
              "username",
              data[0].aname,
              365 * 24 * 60 * 60 * 1000
            );
            that.setCookie("num", data[0].ano, 365 * 24 * 60 * 60 * 1000);
            that.setCookie(
              "password",
              data[0].acode,
              365 * 24 * 60 * 60 * 1000
            );
            that.$message({
              message: "管理员" + data[0].aname + "登陆成功！",
              type: "success"
            });
            that.$router.push("/admin/bookList");
          } else {
            that.$message.error("用户名或密码错误");
          }
        });
    },
    Login() {
      if (this.identity == "admin") {
        this.AdminLogin();
      } else if (this.identity == "user") {
        this.UserLogin();
      } else {
        this.$message.error("请选择登录身份");
      }
    },
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (that.form.scode == that.form.recode) {
            that.$http
              .post("/api/user/snoSearch", {
                sno: that.form.sno
              })
              .then(response => {
                var data = response.body;
                console.log(data);
                if (data.length == 0) {
                  that.$http
                    .post("/api/user/register", {
                      sno: that.form.sno,
                      sname: that.form.sname,
                      ssex: that.form.ssex,
                      snum: that.form.snum,
                      scode: that.form.scode
                    })
                    .then(response => {
                      that.$message({
                        message: "注册成功",
                        type: "success"
                      });
                      that.dialogVisible = false;
                      that.form = {
                        sno: "",
                        sname: "",
                        ssex: "",
                        snum: "",
                        scode: "",
                        recode: ""
                      };
                    });
                } else {
                  that.$message.error("该账号已被注册");
                }
              });
          } else {
            that.$message.error("两次密码输入不同");
          }
        } else {
          that.$message.error("请输入完整的信息");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.main,
#bg {
  width: 100%;
  height: 100%;
  position: relative;
}
#bg {
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgb(155, 200, 240);
}
.mainbox /deep/ .el-dialog {
  width: 70%;
  min-width: 1000px;
  position: relative;
}
.main /deep/ .el-dialog__header {
  box-shadow: 0px 5px 5px 0px rgba(229, 229, 229, 1);
}
.main /deep/ .el-dialog__title {
  color: rgba(108, 138, 216, 1);
  font-size: 22px;
}
.mainbox {
  width: 440px;
  height: 400px;
  top: 200px;
  left: 50%;
  margin-left: -220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 70px;
  text-align: center;
  position: absolute;
}
#content {
  width: 370px;
  height: 100%;
  float: right;
  margin-right: 40px;
  position: relative;
}
#content h1 {
  width: 100%;
  height: 30px;
  display: block;
  color: rgba(80, 80, 80, 1);
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  margin: 70px 0 40px 0;
}
#content input {
  width: 90%;
  height: 35px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  font-size: 16px;
  line-height: 30px;
  border: rgba(229, 229, 229, 1) solid 1px;
  text-align: left;
  text-indent: 50px;
  margin: 0 5% 20px 5%;
  outline: none;
}
#content img {
  position: absolute;
  width: 20px;
  height: 20px;
}
#identity {
  width: 100%;
}
#identity input {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  padding: 0;
  border: 1px solid #3151bf;
  border-radius: 0;
  outline: none;
  margin: 5px 8px 5px 0;
  cursor: pointer;
  float: left;
}
#identity input:checked {
  background: url("../assets/choose.png") no-repeat 0.5px 0;
  background-size: 12px 12px;
  border: 1px solid #3151bf;
}
#identity label {
  width: 60px;
  font-size: 10px;
  color: black;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
  cursor: pointer;
}
#content span {
  width: 70px;
  height: 30px;
  display: block;
  margin: -20px 0 0 280px;
  color: rgb(98, 198, 255);
  line-height: 30px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}
#login_btn {
  width: 90%;
  height: 35px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(108, 138, 216, 1);
  border-radius: 10px;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
  margin: 5% 20px;
}
#zhuche {
  text-decoration: none;
}
</style>
