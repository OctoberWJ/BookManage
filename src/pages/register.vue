<template>
  <div>
    <topCopy style="position:absolute;top:-73px;z-index:1;"></topCopy>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
      style="text-align:left;width:70%;margin:73px 15% 0 15%;"
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
      <router-link :to="'/'">
        <el-button>取消</el-button>
      </router-link> 
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
    </span>
    <!-- 写第二个弹窗 
        点击用户注册时就直接弹出了弹窗，用什么办法把它取消 等待点击取消按钮时出现
    
    
    -->
    <!-- <el-dialog title="是否取消注册" :visible.sync="dialogVisible" width="30%">
      <router-link :to="'/'">
        <el-button @click="dialogVisible = false" type="primary">确认</el-button>
      </router-link>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog> -->
  </div>
</template>

<script>
import topCopy from "../components/topCopy";
export default {
  name: "register",
  components: {
    topCopy
  },
  data() {
    return {
      form: {
        sno: "",
        sname: "",
        ssex: "",
        snum: "",
        scode: "",
        recode: ""
      },
      dialogVisible: true,
      rules: {
        sno: [{ required: true, message: "请输入账号", trigger: "blur" }],
        sname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        scode: [{ required: true, message: "请输入密码", trigger: "blur" }],
        recode: [{ required: true, message: "请重复密码", trigger: "blur" }]
      }
    };
  },
  methods: {
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
</style>
