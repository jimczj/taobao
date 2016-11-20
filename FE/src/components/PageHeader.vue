<template>
  <el-row class="header">
    <el-col :span="4" :offset="2">
      <div class="grid-content">
        <router-link tag="li" to="/"><a href="javascript:;">商城</a></router-link>
      </div>
    </el-col>
    <el-col :span="6" :offset="12">
      <el-menu class="menu" default-active="1" mode="horizontal">
        <el-menu-item index="1" v-show="!$store.getters.user.username" ><router-link tag="li" :to="{ name: 'login'}"><a>登录</a></router-link></el-menu-item>
        <el-submenu class="menu" index="2" v-show="$store.getters.user.username">
          <template slot="title">{{$store.getters.user.username}}</template>
          <el-menu-item index="2-1">￥{{$store.getters.user.money}}</el-menu-item>
          <el-menu-item index="2-2"><router-link tag="li" :to="{ name: 'order'}"><a>我的订单</a></router-link></el-menu-item>
          <el-menu-item index="2-3"><a href="javascript:;" @click="signout">退出</a></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
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
  },
}
</script>

<style>
.header
{
  font-size: 19px;
  font-weight: 400;
  color: #fff;
  padding: 0.5rem;
  background-color: #de3232;
  margin-bottom: 20px;
  display: -webkit-flex;
  display:         flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.menu,.menu li,.menu a,.menu ul,.menu div,.menu:hover,.menu li:hover,.menu a:hover,.menu ul:hover,.menu div
{
  font-size: 19px;
  font-weight: 400;
  background-color: #de3232!important;
  color: #fff;
  border:none!important;
  border-bottom:none!important;
}
.header a,.header a:visited,.header a:hover{
  color: #fff;
}
.header li
{
  text-align: center;
}
</style>
