<template>
<el-row class="header">
  <el-col :span="4" :offset="2">
    <div class="grid-content bg-purple-dark">
      <router-link tag="li" to="/"><a>账号管理系统</a></router-link>
    </div>
  </el-col>
  <el-col :span="8" :offset="10">
    <el-row>
      <el-col :span="8">  <router-link tag="li" to="/login"><a>登录</a></router-link></el-col>
      <el-col :span="8">  <router-link tag="li" to="/"><a>注册</a></router-link></el-col>
      <el-col :span="8">  <router-link tag="li" to="main/good_student"><a>指南</a></router-link></el-col>
    </div>
    </el-row>
</el-row>
</template>

<script>

export default {
 
}
</script>

<style>
.header
{
  font-size: 19px;
  font-weight: 400;
  color: #fff;
  padding: 20px;
  background-color: #20a0ff;
  margin-bottom: 20px;
}
.header a:visited{
  color: #fff;
}
.header a:hover{
  color: #EFF2F7;
}
</style>
