<template>
  <div class="form">
    <h3>登陆</h3>
    <!-- 登陆框 start-->
    <div class="login_form">
      <el-input placeholder="请输入姓名" v-model="user.username"> </el-input>
      <el-input placeholder="请输入密码" v-model="user.password" type="password" @keyup.enter="login"></el-input>
      <el-button @click="login">登陆</el-button>
      <p><router-link tag="li" :to="{ name: 'register'}"><a>注册</a></router-link></p>
    </div>
    <!-- 登陆框 end -->
  </div>
</template>

<script>
import authService from '../services/authService'
export default {

  data () {
    const data = {
      user:{
        username:'',
        password:'',
      }
    }
    return data;
  },

  methods:{
    login () {
      authService.login(this.user).then(()=>{
        this.$router.push('/product');
      });
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

</style>
