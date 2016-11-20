
<template>
  <main>
    <!-- modify product Form start-->
    <el-dialog title="修改产品信息" v-model="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="产品名称">
          <el-input v-model="form2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input v-model="form2.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form2.price" auto-complete="off" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form2.number" type="number" min="0" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible2 = false" @click="modifyProduct">确 定</el-button>
      </div>
    </el-dialog>
    <!-- modify product end start-->
    <!-- shoppingProduct start-->
    <el-dialog  v-model="shoppingProductVisible">
      <el-row class="shoppingProduct">
        <el-row class="shoppingProductTitle middle">
          <el-col :span="6">
            <h3>购物车</h3>
          </el-col>
          <el-col :span="6" :offset="12" class="right">
            <el-button type="text" @click="deleteShoppingProduct">
              <i class="el-icon-delete"></i>
              <span>清空</span>
            </el-button>
          </el-col>
        </el-row>
        <el-row v-for="item in selectedList" class="middle shoppingProductTitle">
          <el-col :span="6">
            <h3>{{item.name}}</h3>
          </el-col>
          <el-col :span="6">
            <p>单价：<span class="product_price">￥{{item.price}}</span></p>
          </el-col>
          <el-col :span="6">
            <el-button type="text" @click="minusOrderProduct(item)" v-show="item.buyNumber"><i class="el-icon-minus"></i></el-button>
            <span class="buy_number">{{item.buyNumber}}</span>
            <el-button type="text" @click="addOrderProduct(item)"><i class="el-icon-plus"></i></el-button>
          </el-col>
        </el-row> 
        <el-row class="middle shoppingProductTitle">
          <el-col :span="6">总价：</el-col>
          <el-col :span="6" :offset="12" class="product_price  right">￥{{totalPrice}}</el-col>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="shoppingProductVisible = false" @click="confirmCreateOrder" :disabled="!totalPrice">确定支付</el-button>
      </div>
    </el-dialog>
      <!-- shoppingProduct end-->
    <!-- add product Form start-->
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
    <!-- add product end-->
    <!-- list-title start-->
    <el-row class="list-title">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp产品列表</el-col>
      <el-col :span="6" :offset="12" class="text_right" v-hasPermission="'addProduct'"> <el-button type="text" @click.native="dialogFormVisible = true"><i class="el-icon-plus"></i></el-button></el-col>
    </el-row> 
    <!-- list-title end -->
     
    
    <!-- product start -->

    <el-row class="product_item" v-for="item in list">
      <el-col :span="6" class="product_pic_box">
        <img src="../assets/product1.jpg" alt="img">
      </el-col>
      <el-col :span="18" class="product">
        <el-row class="middle">
          <el-col :span="18"><h2>{{item.name}}</h2></el-col>
          <el-col :span="6" class="right">
            
          <el-button type="text" @click="confirmEdit(item)"><i class="el-icon-edit"></i></el-button>
            <el-button type="text" @click="confirmDelete(item)"><i class="el-icon-minus"></i></el-button>
          </el-col>
        </el-row>
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
    <el-row class="shoppingCart">
      <el-col :span="12" class="shoppingCartBox">


    <!-- shoppingCart start -->
        <el-row>
          <el-col :span="6">
            <el-badge :value="totalCount" class="middle shoppingCart_icon_box">
              <el-button class="shoppingCart_icon middle" @click="toggelShoppingProduct">
                <img src="../assets/shoppingCart.png" alt="shoppingCart" width="1rem" height="1rem">
              </el-button>
            </el-badge>
          </el-col>
          <el-col :span="18">
            <p class="total_money middle">￥{{totalPrice}}</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-button type="danger" class="account" @click="toggelShoppingProduct" :disabled="!totalPrice">选好了</el-button>
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
      dialogFormVisible2:false,
      shoppingProductVisible:false,
      list: [],
      selectedList:[],
      totalPrice:0,
      totalCount:0,
      form2:{
       
      },
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
    },



  },

  methods:{
    minusOrderProduct (item) {
      if(item.buyNumber>0){
        item.buyNumber--;
      } 
    },
    addOrderProduct (item) {
      if(item.number>item.buyNumber){
        item.buyNumber++;
      }
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
      return orderService.create(json).then(()=>{
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
    },
    confirmDelete (item){
      this.$confirm('此操作将永久删除该产品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productService.deleteById(item)
        .then(()=>{
          this.loadProductList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    confirmEdit(item){
      this.form2 = item;
      this.dialogFormVisible2 = true;
    },
    confirmCreateOrder(){
      this.$confirm('请确定好你要买的物品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.createOrder();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    modifyProduct (){
      productService.update(this.form2)
        .finally(()=>{
          this.dialogFormVisible2 = false;
          this.form2 = {};
          this.loadProductList();
        })
    },
    toggelShoppingProduct (){
      console.log(this.shoppingProductVisible);
      this.shoppingProductVisible = !this.shoppingProductVisible;
    },
    deleteShoppingProduct (){
      this.selectedList.forEach((item)=>{
        item.buyNumber = 0;
      });
      this.shoppingProductVisible = false;
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
.product button+button{
  margin-left: 1.5rem;
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
  position: relative;
  background-color: #f5f5f5;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 3rem;
  z-index: 99;
  opacity: 1;
}
.shoppingCartBox
{
  position: relative;
}
.shoppingCart div
{
  height: 100%;
} 
.shoppingCart_icon
{
  display: block;
  height: 4rem;
  width: 100%;
  height: 100%;
  text-align: center;
  border:none;
}
.shoppingCart_icon_box
{
  z-index: 100;
}
.shoppingProductTitle
{
  padding: 1rem;
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
  border:none;
  border-radius: initial;
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

.shoppingProduct{
  background: #f5f5f5;
}
</style>
