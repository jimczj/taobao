<template>
  <main>
    <!-- Form -->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp评优等生贴</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增" v-model="dialogFormVisible">
      <el-form :model="goodStudentForm">
        <el-form-item label="班级ID">
          <el-input v-model="goodStudentForm.class_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优等头衔">
          <el-input v-model="goodStudentForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖金">
          <el-input v-model="goodStudentForm.bond" auto-complete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createGoodStudent">确 定</el-button>
      </div>
    </el-dialog>
    <ul>
      <li v-for="goodStudent in goodStudents">
        <el-row>
          <el-col :span="3">
            <p class="text_center"><img src="../assets/avator.jpg" alt="avator"></p>
            <p class="avator text_center">{{goodStudent.creator.username}}
            </p>
          </el-col>
          <el-col :span="19" :offset="2">
            <h4>标题: {{goodStudent.title}}</h4>
            <p class="content">
              恭喜{{goodStudent.owner}}获得{{goodStudent.title}}及{{goodStudent.bond}}奖金
            </p>
            <Comment :data.sync="goodStudent" type="good_student"/>
            </ul>
          </el-col>
        </el-row>
      </li>
    </ul>    
  </main>
</template>

<script>
import goodStudentService from '../services/goodStudentService'
import commentService from '../services/commentService'
import Comment from '../components/Comment'
export default {
  data () {
    let data = {
      dialogTableVisible:false,
      dialogFormVisible:false,
      goodStudents: [],
      goodStudentForm:{
        class_id:'',
        title:'',
        bond:'',
      },
    };
    return data;
  },
  components:{Comment},
  methods:{
    createGoodStudent (){
      goodStudentService.createGoodStudent(this.goodStudentForm)
      .then(()=>{
        goodStudentService.getGoodStudentList()
        .then(res =>{
          this.goodStudents = res.body.json;
        }); 
      });
    }, 
  },
  created() {
    goodStudentService.getGoodStudentList().then(res =>{
      this.goodStudents = res.body.json;
    });
  }
}
</script>

<style>

</style>
