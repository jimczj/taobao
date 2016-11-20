
<template>
  <main>
    <el-row class="list-title" v-loading.fullscreen.lock="fullscreenLoading">
      <el-col :span="6" class="text_left"><i class="el-icon-menu"></i> &nbsp&nbsp我的订单</el-col>
    </el-row> 
    <!-- order start -->
    <el-row class="product_item" v-for="item in list">
      <el-col :span="6" class="product_pic_box">
        <p>购买时间：</p>
        <p>{{item.create_time}}</p>
      </el-col>
      <el-col :span="18" class="product">
        <ul>
          <li v-for="product in item.products">
            <el-row> 
              <el-col :span="6" class="padding">
                <img src="../assets/product1.jpg" alt="img">
              </el-col>
              <el-col :span="18" class="padding">
                <h2>产品名称：{{product.name}}</h2>
                <p>产品描述：{{product.description}}</p>
                <p>产品单价：<span class="product_price">￥{{product.price}}</span></p>
              </el-col>
            </el-row>
          </li>
        </ul>
        <p>总价:<span class="product_price">￥{{item.totalPrice}}</span></p>
      </el-col>
    </el-row>
     <!-- order end -->
  </main>
</template>

<script>
import productService from '../services/productService'
import orderService from '../services/orderService'

export default {
  data () {
    let data = {
      fullscreenLoading:false,
      list: [],
    };
    return data;
  },
  created() {
    this.fullscreenLoading = true;
    orderService.getList().then(res =>{
      this.list = res.body.json;
      this.fullscreenLoading = false;
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
.product img
{
  width: 100%;
  max-height:200px; 
}
.product_price
{
  color: #de3232;
}
.product p
{
  margin:0.5rem 0;
}
.padding
{
  padding: 1rem;
  overflow: hidden;
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

</style>
