 <template>
  <table border="1">
    <tr>
      <th width="25%">旷课天数</th>
      <th width="25%">旷课总数</th>
      <th width="25%">总欠费金额</th>
      <th width="25%">总缴费金额</th>
    </tr>
    <tr>
      <td width="25%">{{table_data.truancy_day}}</td>
      <td width="25%">{{table_data.truancy_times}}</td>
      <td width="25%">{{table_data.unpayed_money}}</td>
      <td width="25%">{{table_data.payed_money}}</td>
    </tr>
  </table>
</template>

<script>
  import userService from '../services/userService'
  export default {
    data() {
      return {
        table_data:{},
      }
    },
    created() {
      userService.getReporting().then(res =>{
        this.table_data = res.body.json;
      }); 
    }
  }
</script>
<style>
  table{
    margin-top: 100px;
    width: 100%;
    text-align: center;
  }
</style>