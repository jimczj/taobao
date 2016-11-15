<template>
  <main>
    <!-- Form -->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp考勤结果帖</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增" v-model="dialogFormVisible">
      <el-form :model="checkInForm">
        <el-form-item label="班级ID">
          <el-input v-model="checkInForm.class_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input v-model="checkInForm.course_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旷课日期">
          <el-date-picker v-model="checkInForm.missing_date" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        
        <el-select v-model="checkInForm.truancy_student" multiple placeholder="请选择缺勤学生"> 
          <el-option v-for="item in user_options" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createCheckIn">确 定</el-button>
      </div>
    </el-dialog>
    <ul>
      <li v-for="checkIn in checkIns">
        <el-row>
          <el-col :span="3">
            <p class="text_center"><img src="../assets/avator.jpg" alt="avator"></p>
            <p class="avator text_center">
            </p>
          </el-col>
          <el-col :span="19" :offset="2">
            <h4>标题: {{checkIn.course_name}}</h4>
            <p class="content">
              <p><strong>class:</strong>{{checkIn.class_id}}</p>
              <p><strong>date:</strong>{{checkIn.missing_date}}</p>
              <p><strong>student:</strong>{{checkIn.truancy_student | showUsersName }}</p>
            </p>
            <Comment :data.sync="checkIn" type="checkIn"/>
            </ul>
          </el-col>
        </el-row>
      </li>
    </ul>    
  </main>
</template>

<script>
import checkInService from '../services/checkInService'
import userService from '../services/userService'
import Comment from '../components/Comment'
export default {
  data () {
    let data = {
      dialogTableVisible:false,
      dialogFormVisible:false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      user_options:[],
      checkIns: [],
      checkInForm:{
        class_id:'',
        course_name:'',
        missing_date:'',
        truancy_student:[],
      },
    };
    return data;
  },
  components:{Comment},
  methods:{
    createCheckIn (){
      checkInService.createCheckIn(this.checkInForm)
      .then(()=>{
        checkInService.getCheckInList()
        .then(res =>{
          this.checkIns = res.body.json;
        }); 
      });
    }, 
  },
  created() {
    checkInService.getCheckInList().then(res =>{
      this.checkIns = res.body.json;
    });
    userService.getUserList().then(res =>{
        let json = res.body.json;
        let options = [];
        json.map((item,index)=>{
          options.push({label:item.username,value:item._id});
        });
        this.user_options = options;
    }); 
    
  },
}
</script>

<style>

</style>
