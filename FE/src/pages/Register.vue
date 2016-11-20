<template>
  <div class="form">
    <h3>注册</h3>
    <!-- 注册框 start -->
    <div class="register_form">
      <el-input placeholder="请输入姓名" v-model="user.username">
      </el-input>
      <el-input placeholder="请输入密码" v-model="user.password" type="password"></el-input>
      <el-input placeholder="再次输入密码" v-model="user.password2" type="password" @></el-input>
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
      user:{
        username:'',
        password:'',
        password2:'',
      },
    };
    return data;
  },
  methods:{
    register () {
      if(this.user.password!=this.user.password2){
        this.$message.error("两次密码不相等");
        return;
      }
      authService.register(this.user).then(()=>{
        this.$router.push('/login');
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
