<template>
  <div class="topAdmin">
    <h1>书籍管理平台</h1>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="OutLogin">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--点击头像到达用户个人主页-->
    <span id="back" @click="GoDetail(username)">
      <img :src="head" />
    </span>
    <span id="name">{{username}}</span>
  </div>
</template>

<script>
export default {
  name: "topAdmin",
  data() {
    return {
      head: require("../assets/head_Portrait.svg"),
      username: ""
    };
  },
  methods: {
    GoDetail(username) {
      this.$router.push({
        path: "/admin/adminBase",
        query: {
          id: username
        }
      });
    },
    setHead() {
      this.username = this.getCookie("username");
      if (this.username == undefined || this.username == "") {
        alert("请先登录");
        this.$router.push("/");
      }
    },
    OutLogin() {
      const that = this;
      that.setCookie("username", "", -1);
      that.$router.push("/");
    }
  },
  mounted() {
    this.setHead();
  }
};
</script>

<style scoped>
.topAdmin {
  width: 100%;
  height: 60px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(245, 245, 245);
  text-align: left;
  font-size: 20px;
}
.topAdmin h1 {
  width: 264px;
  height: 36px;
  padding: 12px 51px;
  margin: 0;
  color: rgba(80, 80, 80, 1);
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  font-weight: bold;
  display: inline-block;
}
.el-dropdown {
  width: 88px;
  height: 20px;
  float: right;
  text-align: center;
  margin: 20px 20px 20px 0;
}
.el-dropdown-link {
  cursor: pointer;
  padding-right: 10px;
}
.el-icon-arrow-down {
  font-size: 20px;
}
.topAdmin img {
  width: 35px;
  height: 35px;
  border-radius: 35px;
  float: right;
  margin: 12.5px 10px;
}
#name {
  height: 30px;
  font-size: 16px;
  margin: 15px 10px;
  color: rgba(56, 56, 56, 1);
  font-size: 14px;
  line-height: 30px;
  font-weight: bold;
  float: right;
}
</style>
