<template>
  <el-table :data="userData" style="width: 100%">
    <el-table-column prop="username" label="姓名" > </el-table-column>
    <el-table-column prop="email" label="邮箱" > </el-table-column>
    <el-table-column prop="sex" label="性别" > </el-table-column>
    <el-table-column prop="age" label="年龄" > </el-table-column>
    <el-table-column prop="class" label="班级" > </el-table-column>
    <el-table-column prop="role_id.role_name" label="角色" > </el-table-column>
    <el-table-column prop="role_id.role_rights" label="角色权限"> </el-table-column>
  </el-table>
</template>

<script>
  import userService from '../services/userService'
  export default {
    data() {
      return {
        userData: [],
      }
    },
    method:{
     
    },
    created() {
      userService.getUserList().then(res =>{
        let json = res.body.json;
        json.map((item,index)=>{
          json[index].role_id.role_rights = json[index].role_id.role_rights.join(',');
        });
        this.userData = json;
      }); 
    }
  }
</script>
