<template>
  <div class="form">
    <h3>注册</h3>
    <!-- 注册框 start -->
    <div class="register_form">
      <el-input placeholder="请输入姓名" v-model="user.username">
      </el-input>
      <el-input placeholder="请输入密码" v-model="user.password" type="password"></el-input>
      <el-input placeholder="请输入邮箱" v-model="user.email" type="email"></el-input>
      <el-input placeholder="请输入班级" v-model="user.class" ></el-input>
      <el-input placeholder="请输入年龄" v-model="user.age" type="number" min="0"></el-input>
      <el-select v-model="user.sex" placeholder="性别">
        <el-option
        v-for="item in [{label:'男',value:'男'},{label:'女',value:'女'}]"
        :label="item.label"
        :value="item.value"> </el-option>
      </el-select>
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
        email:'',
        class:'',
        age:'',
        sex:'M'
      },
    };
    return data;
  },
  methods:{
    register () {
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
