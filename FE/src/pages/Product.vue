
<template>
  <main>
    <!-- Form start-->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp班会帖</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增班会帖" v-model="dialogFormVisible">
      <el-form :model="productForm">
        <el-form-item label="班级ID">
          <el-input v-model="productForm.class_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="productForm.place" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="话题">
          <el-input v-model="productForm.topic" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="要求人数">
          <el-input v-model="productForm.numbers_required" type="number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createMeeting">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form end-->
    
  </main>
</template>

<script>
import productService from '../services/productService'

export default {
  data () {
    let data = {
      dialogFormVisible:false,
      products: [],
      productForm:{
        class_id:'',
        place:'',
        title:'',
        numbers_required:0,
        numbers_gotten:0,
        topic:'',
        pool_agrees:'',
        pool_disagrees:'',
      },
    };
    return data;
  },

  components:{},

  methods:{
    
  },

  created() {
    productService.getList().then(res =>{
      this.products = res.body.json;
    });
  }
}
</script>

<style>

</style>
