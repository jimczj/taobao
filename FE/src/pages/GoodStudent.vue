<!--
  Represents Page not Found page
  creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},//发帖人
  class_id:  {type:String,required:true},//班级ID
  title: {type :String},//优等头衔
  bond: {type:Number,min:0},//奖金
  owner:
  
  comment:

  creator:  {type:Schema.Types.ObjectId,required:true,ref: 'User'},
  topic_id: {type:String},
  create_time: {type:Date, default: Date.now},
  content: {type:String,required:true}
-->
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
p
{
  word-wrap:break-word;
  word-break:normal; 
}
main h2
{
  font-weight: 400;
  color: #1f2f3d;
  font-size: 28px;
}
main li
{
  padding: 10px;
  -webkit-transition: all .3s;
  transition: all .3s;
  margin: 10px 0;
  border-bottom: 1px solid #7B7676;
}
main .avator
{
  color: #1F2D3D;
  font-size: 20px;
  box-sizing: content-box;
  text-align: center;
  vertical-align: middle;
}
main .title
{
  padding: 0 20px;
  color: #259;
  font-size: 20px;
  line-height: 20px;
  text-align: left;
  vertical-align: middle;
}
main .create-time
{
  padding: 10px;
  color: #7B7676;
  font-size: 12px;
}
.content
{
  padding: 20px;
}
.list-title
{
  padding: 20px;
  border-bottom: 1px solid #7B7676; 
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}
.text_center
{
  text-align: center;
}
.text_right
{
  text-align: right;
}
.text_left
{
  text-align: left;
}
.comment
{
  border-bottom:1px solid #7B7676;
  padding: 10px;
  margin-bottom: 10px;
  vertical-align: middle;
}
</style>
