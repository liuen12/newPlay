<template>
      <el-container id="app">
        <audio id="audio" style="display: none" autoplay src="../static/7815.wav" controls="controls">
          Your browser does not support the audio tag.
        </audio>
      <el-aside width="200px" style="height: 100%;overflow-x: hidden">
        <router-view name="nav_left"/>
      </el-aside>
      <el-container>
        <el-header>
          <router-view name="nav_top"/>
          <router-view name="nav_top_index"/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    <router-view name="login"/>
  </el-container>
  <!-- </div> -->

</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
  body, html, h1,h2,h3,h4,h5,h6,ul,li,ol,a{
    text-decoration: none;
    padding: 0;
    margin: 0;
  }
body, html{
  height: 100%;
  width: 100%;
}
.el-select{
  width: 100%;
}
.el-cascader{
  width: 100%;
}
.el-table .info-row {
  background: #f6f3f7;
}
.el-submenu .el-menu-item {
  min-width: 50px;
}
.Pagination{text-align: right;padding-right: 100px;padding-top: 20px;}
</style>
