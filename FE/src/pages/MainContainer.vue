<template>
<el-row>
  <el-col :span="6" class="nav-bar" :offset="2">
      <router-link tag="li" to="users"><a>用户列表</a></router-link>
      <router-link tag="li" to="good_student"><a>班会帖</a></router-link>
      <router-link tag="li" to="good_student"><a>班费帖</a></router-link>
      <router-link tag="li" to="good_student"><a>评优等生帖</a></router-link>
      <router-link tag="li" to="main/good_student"><a>考勤结果帖</a></router-link>
  </el-col>
  <el-col :span="16">
    <router-view></router-view>
    </el-col>
</el-row>
</template>

<script>

export default {
 
}
</script>

<style>
h2
{
  text-align: center;
}
.nav-bar
{
  font-size: 16px;
  color: #5e6d82;
  line-height: 40px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  position: relative;
}
.nav-bar a
{
  display: block;
  padding: 20px 30px;
  -webkit-transition: all .3s;
  transition: all .3s;
  text-align: center;

}
.nav-bar a:visited
{
  color: #5e6d82;
}
.nav-bar a:hover
{
  color: #20a0ff;
}
</style>
