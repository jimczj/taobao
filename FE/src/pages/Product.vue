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
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp产品列表</el-col>
      <el-col :span="6" :offset="12" class="text_right"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <el-dialog title="新增产品" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="产品名称">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.price" auto-complete="off" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.number" type="number" min="0" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false" @click="createProduct">确 定</el-button>
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
          <el-col :span="6" :offset="12" class="right">
            <el-button type="text" @click="minusOrderProduct(item)" v-show="item.buyNumber"><i class="el-icon-minus"></i></el-button>
            <span class="buy_number">{{item.buyNumber}}</span><el-button type="text" @click="addOrderProduct(item)"><i class="el-icon-plus"></i></el-button>
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
          <el-badge :value="totalCount" class="middle">
            <el-button size="small" class="shoppingCart_icon"></el-button>
          </el-badge>
        </el-col>
        <el-col :span="18">
          <p class="total_money middle">￥{{totalPrice}}</p>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" :offset="6">
      <p class="account" @click="createOrder">选好了</p>
    </el-col>
    </el-row>
    <!-- shoppingCart end -->
  </main>
</template>

<script>
import productService from '../services/productService'
import orderService from '../services/orderService'
import MySwipe from '../components/MySwipe.vue'

export default {
  data () {
    let data = {
      dialogFormVisible:false,
      list: [],
      selectedList:[],
      totalPrice:0,
      totalCount:0,
      form:{
        name:'',
        description:'',
        price:0,
        number:0,
      },
    };
    return data;
  },

  components:{MySwipe},
  computed:{
    totalPrice (){
      return this.list.reduce((a,b)=>{
        return a + b.price*b.buyNumber;
      },0)
    },
    totalCount (){
      return this.list.reduce((a,b)=>{
        return a + b.buyNumber;
      },0)
    },
    selectedList (){
      let list = []
      this.list.forEach((item)=>{
        if(item.buyNumber>0){
          list.push(item) ;
        }
      });
      return list;
    }


  },

  methods:{
    minusOrderProduct (item) {
      if(item.buyNumber>0){
        item.buyNumber--;
      } 
    },
    addOrderProduct (item) {
      item.buyNumber++;
    },
    createProduct () {
      productService.create(this.form)
        .then(()=>{
          this.form = {
            name:'',
            description:'',
            price:0,
            number:0,
          };
          this.loadProductList();
        });
    },
    createOrder (){
      let json = {products:[]};
      this.selectedList.forEach((item)=>{
        json.products.push({product_id:item._id,number:item.buyNumber});
      });
      orderService.create(json).then(()=>{
        this.$router.push('/order');
      });
    },
    loadProductList (){
      productService.getList().then(res =>{
        res.body.json.forEach((item,index)=>{
          res.body.json[index].buyNumber = 0;
        });
        this.list = res.body.json;
      });
    }
    
  },

  created() {
    this.loadProductList();
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
.right
{
  text-align: right;
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
  max-width:100%;
  background: url(../assets/shoppingCart.png) no-repeat center;
  background-size:cover;

}

.shoppingCart .shoppingCart_icon
{
  width: 100%;
  height: 100%;
  text-align: center;
  border:none;

}
.shoppingCart .total_money
{
  height: 100%;
  width: 100%;
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
