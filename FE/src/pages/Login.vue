<template>
  <div class="form">
    <!-- 登陆框 start-->
    <el-row>
      <el-col :span="12" class="navbar" :class="{'active': navBarTab === 'login'}" >
        <div @click="selectLoginOrRegister">登录</div>
      </el-col>
      <el-col :span="12" class="navbar" :class="{'active': navBarTab === 'register'}" >
        <div @click="selectLoginOrRegister">注册</div>
      </el-col>
    </el-row>
    <div class="login_form" :class="{'hidden': navBarTab !== 'login'}">
      <el-input placeholder="请输入姓名" v-model="loginUser.username"> </el-input>
      <el-input placeholder="请输入密码" v-model="loginUser.password" type="password"></el-input>
      <el-button @click="login">登陆</el-button>
    </div>

  <!-- 登陆框 end -->
  <!-- 注册框 start -->
    <div class="register_form" :class="{'hidden': navBarTab !== 'register'}">
      <el-input placeholder="请输入姓名" v-model="registerUser.username">
      </el-input>
      <el-input placeholder="请输入密码" v-model="registerUser.password" type="password"></el-input>
      <el-input placeholder="请输入邮箱" v-model="registerUser.email" type="email"></el-input>
      <el-input placeholder="请输入班级" v-model="registerUser.class" ></el-input>
      <el-button @click="register">注册</el-button>
    </div>

  <!-- 注册框 end -->

</div>
</template>

<script>
import authService from '../services/authService'
export default {
  data () {
    const data = {
      loginUser:{
        username:'',
        password:'',
      },
      registerUser:{
        username:'',
        password:'',
      },
      navBarTab:'register',
    };
    return data;
  },
  methods:{
    login () {
      authService.login(this.loginUser).then(()=>{
        this.$router.push('/main/good_student');
      });
      
    },
    register () {
      authService.register(this.registerUser).then(()=>{
        this.$router.push('/login');
      });
    },
    selectLoginOrRegister () {
      if(this.navBarTab === 'login') {
        this.navBarTab = 'register';
      }else {
        this.navBarTab = 'login';
      }
    }
  }
}
</script>

<style>
.form
{
  width: 500px;
  margin: 0 auto;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.form input,.form button
{
  margin-top:10px;
  margin: 10px auto;

}
.form .navbar
{
  padding: 10px;
  text-align: center;
}
.form .active
{
  background: #C0CCDA;
}
.hidden
{
  display: none;
}
</style>
