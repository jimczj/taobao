<!-- var ProductSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },//产品名称
  description: {
    type: String
  },//产品详细描述
  price: {
    type: Number,
    required: true
  },//产品价格
  number: {
    type: Number,
    min: 0,
    default: 0
  },//剩余库存
}); -->
<template>
  <main>
    
    <!-- Form start-->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp班会帖</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增班会帖" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级ID">
          <el-input v-model="form.class_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="form.place" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="话题">
          <el-input v-model="form.topic" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="要求人数">
          <el-input v-model="form.numbers_required" type="number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createMeeting">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form end-->
    <!-- product start -->
    <el-row class="product_item" v-for="item in list">
      <el-col :span="6" class="product_pic_box">
        <img src="../assets/product1.jpg" alt="img">
      </el-col>
      <el-col :span="18" class="product">
        <h2>{{item.name}}</h2>
        <p>{{item.description}} </p>
        <p>剩余:{{item.number}} </p>
        <el-row class="middle">
          <el-col :span="6" class="product_price">￥{{item.price}}</el-col>
          <el-col :span="6" offset="12">
            <el-button type="text" @click="minusProduct(item)"><i class="el-icon-minus"></i></el-button>
            <span class="buy_number">{{item.buyNumber}}</span><el-button type="text" @click="addProduct(item)"><i class="el-icon-plus"></i></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
     <!-- product end -->
    <!-- shoppingCart start -->
    <el-row class="shoppingCart">
    <el-col :span="12">
      <el-row>
        <el-col :span="6">
          <span class="shoppingCart_icon"></span>
        </el-col>
        <el-col :span="18">
          <p class="total_money">￥{{totalPrice}}</p>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" offset="6">
      <p class="account">选好了</p>
    </el-col>
    </el-row>
    <!-- shoppingCart end -->
  </main>
</template>

<script>
import productService from '../services/productService'
import MySwipe from '../components/MySwipe.vue'

export default {
  data () {
    let data = {
      dialogFormVisible:false,
      list: [],
      totalPrice:0,
      totalCount:0,
      form:{
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

  components:{MySwipe},
  computed:{
    totalPrice (){
      return list.reduce((a,b)=>{
        return a.price*a.buyNumber + b.price*b.buyNumber;
      },0)
    },
    totalCount(){
      return list.reduce((a,b)=>{
        return a.buyNumber + b.buyNumber;
      },0)
    }

  },

  methods:{
    minusProduct (item) {
      console.log(item);
      item.number--;
    },
    addProduct (item) {
      console.log(item);
      item.number++;
    },
    
  },

  created() {
    productService.getList().then(res =>{
      res.body.json.forEach((item,index)=>{
        res.body.json[index].buyNumber = 0;
      });
      this.list = res.body.json;
    });
  }
}
</script>

<style>
.product_item
{
  border-bottom: 1px solid #f5f5f5;
}
.product_item h2
{
  font-weight:400;
}
.product_item p
{
  color: #7B7676;
  font-size: 0.8rem
}
.product_pic_box,.product
{
  padding: 2rem;
  vertical-align: top;
}
.product_pic_box img
{
  width: 100%;
  max-height:200px; 
}
.product p
{
  margin:0.5rem 0;
}
.product_price
{
  color: #de3232;
}
.middle
{
  display: -webkit-flex;
  display:         flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.shoppingCart
{
  background-color: #f5f5f5;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 3rem;
  z-index: 99;
  opacity: 1;
}
.shoppingCart div
{
  height: 100%;
} 
.shoppingCart_icon
{
  display: block;
  height: 4rem;
  max-width:4rem; 
  background: url(../assets/shoppingCart.png) no-repeat center;
  background-size:cover;

}

.shoppingCart .shoppingCart_icon
{
  width: 100%;
  max-height: 5rem;
  text-align: center;

}
.shoppingCart .total_money
{
  color: #de3232;
  text-align: center;

}
.shoppingCart .account
{
  background-color: #de3232;
  width: 100%;
  height: 100%;
  margin:0;
  color: #fff;
  text-align: center;
  display: -webkit-flex;
  display:         flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>
