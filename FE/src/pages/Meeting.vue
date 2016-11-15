
<template>
  <main>
    <!-- Form start-->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp班会帖</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增班会帖" v-model="dialogFormVisible">
      <el-form :model="meetingForm">
        <el-form-item label="班级ID">
          <el-input v-model="meetingForm.class_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="meetingForm.place" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="话题">
          <el-input v-model="meetingForm.topic" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="要求人数">
          <el-input v-model="meetingForm.numbers_required" type="number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createMeeting">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form end-->
    <ul>
      <li v-for="meeting in meetings">
        <el-row>
          <el-col :span="3">
            <p class="text_center"><img src="../assets/avator.jpg" alt="avator"></p>
            <p class="text_center">{{meeting.creator.username}}</p>
          </el-col>
          <el-col :span="19" :offset="2">
            <h4>标题: {{meeting.topic}}</h4>
            <p class="content">
              <p><strong>地点:</strong>{{meeting.place}}</p>
              <p><strong>应到人数:</strong>{{meeting.numbers_required}}</p>
              <p><strong>实到人数:</strong>{{meeting.numbers_gotten}}</p>
              <p><strong>同意的人:</strong>{{meeting.pool_agrees | showUsersName }}</p>
              <p><strong>不同意的人:</strong>{{meeting.pool_disagrees | showUsersName }}</p>
            </p>
            <el-row>
              <el-col :span="8">
                <el-button type="text" @click="agree(meeting._id)">同意</el-button>
              </el-col>
              <el-col :span="8" :offset="8">
                <el-button type="text" @click="disagree(meeting._id)">不同意</el-button>
              </el-col>
            </el-row>
            <p class="create-time">{{meeting.create_time}}</p>
            <Comment :data.sync="meeting" type="meeting"/>
            </ul>
          </el-col>
        </el-row>
      </li>
    </ul>    
  </main>
</template>

<script>
import meetingService from '../services/meetingService'
import Comment from '../components/Comment'
export default {
  data () {
    let data = {
      dialogFormVisible:false,
      meetings: [],
      meetingForm:{
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

  components:{Comment},

  methods:{
    createMeeting (){
      meetingService.createMeeting(this.meetingForm)
      .then(()=>{
        meetingService.getMeetingList()
        .then(res =>{
          this.meetings = res.body.json;
        }); 
      });
    },
    agree(id){
      meetingService.agree(id)
      .then(()=>{
        meetingService.getMeetingList()
        .then(res =>{
          this.meetings = res.body.json;
        }); 
      });
    },
    disagree(id){
      meetingService.disagree(id)
      .then(()=>{
        meetingService.getMeetingList()
        .then(res =>{
          this.meetings = res.body.json;
        });
      })
    } 
  },

  created() {
    meetingService.getMeetingList().then(res =>{
      this.meetings = res.body.json;
    });
  }
}
</script>

<style>

</style>
