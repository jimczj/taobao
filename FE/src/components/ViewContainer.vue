<!--
  Container for child views (used for organizing routes hierarchy)
-->
<template>
  <router-view></router-view>
</template>

<script>
export default {
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

</style>
