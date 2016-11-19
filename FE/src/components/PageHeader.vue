<template>
<el-row class="header">
  <el-col :span="4" :offset="2">
    <div class="grid-content bg-purple-dark">
      <router-link tag="li" to="/"><a href="javascript:;">商城</a></router-link>
    </div>
  </el-col>
  <el-col :span="6" :offset="12">
    <el-row>
      <el-col :span="12" v-show="!$store.getters.user.username"> <router-link tag="li" :to="{ name: 'login'}"><a>登录</a></router-link></el-col>
      <el-col :span="12" v-show="$store.getters.user.username"> <li>{{$store.getters.user.username}}</li> </el-col>
      <el-col :span="12" v-show="$store.getters.user.username"> <a href="javascript:;" @click="signout">退出</a></el-col>
    </div>
    </el-row>
</el-row>
</template>

<script>
import authService from '../services/authService'

export default {
  methods:{
    signout (){
      authService.signout()
      .then(()=>{
        this.$router.push('/login');
      });
    }
  }

}
</script>

<style>
.header
{
  font-size: 19px;
  font-weight: 400;
  color: #fff;
  padding: 20px;
  background-color: #de3232;
  margin-bottom: 20px;
}
.header a:visited{
  color: #fff;
}
.header a:hover{
  color: #EFF2F7;
}
</style>
