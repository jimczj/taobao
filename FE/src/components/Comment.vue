
<template>
<el-row>
  <el-col :span="24">
    <el-button type="text" @click="toggleCommentList()" v-show="!data.isShowComment">显示评论</el-button>
    <el-button type="text" @click="toggleCommentList()" v-show="data.isShowComment">隐藏评论</el-button>
  </el-col>
  <el-col :span="24">
    <ul v-show="data.isShowComment">
      <li v-show="!data.comments.length">暂时没有评论</li>
      <el-row v-for="comment in data.comments" class="comment">
        <el-col :span="2">
          <p><img class="avator" src="../assets/avator.jpg" alt="avator"></p>
          <p>{{comment.creator.username}}</p>
        </el-col>
        <el-col :span="20" :offset="2" class="content">{{comment.content}}</el-col>
        <p class="create-time">{{comment.create_time}}</p>
      </el-row>

      <el-row>
        <el-col :span="18"><el-input placeholder="请输入评论内容" v-model="data.commentInput"> </el-input></el-col>
        <el-col :span="6" class="text_center"><el-button type="primary" @click="createComment">发表</el-button></el-col>
      </el-row>
  </el-col>
</el-row>

</template>
<!-- //Vue.set -->
<script>
import commentService from '../services/commentService'
export default {
  props:['data','type'],
  watch:{
    data:function (val){
      this.$set(this.data,'isShowComment',false);
      this.$set(this.data,'commentInput','');
      this.$set(this.data,'comments',[]);
    }
  },
  methods:{
    toggleCommentList(){
      if(this.data.isShowComment){
        this.data.isShowComment = false;
      }else {
        commentService.getCommentList(`${this.type}-${this.data._id}`).then(res =>{
          this.data.comments = res.body.json;
          this.data.isShowComment = true;
        });
      }
    },
    createComment(){
      let comment = {
        topic_id:`${this.type}-${this.data._id}`,
        content:this.data.commentInput,
      };
      commentService.createComment(comment)
      .then(res=>{
          this.data.commentInput = '';
          commentService.getCommentList(`${this.type}-${this.data._id}`)
          .then(res =>{
            this.data.comments = res.body.json;
            this.data.isShowComment = true;
          });
      });
    },
  },
  created() {
    //给data添加双向数据
    this.$set(this.data,'isShowComment',false);
    this.$set(this.data,'commentInput','');
    this.$set(this.data,'comments',[]);
  },
}
</script>

<style>

  .avator{
    width: 25px;
    height: 25px;
    border-radius: 3px;
    background-color: #eee;
  }
  .commentItem{
    min-height: 22px;
    word-wrap: break-word;
    color: #222;
  }
  .time{
    color: #999;
  }
  .content{
    vertical-align: center;
    font-size: 13px;
    line-height: 1.7;
  }
</style>
