<template>
<el-container style=" border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-discount"></i>HOME</template>
        <el-menu-item-group>
          <template slot="title">列表一</template>
          <el-menu-item index="/home/article">文章列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 20px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 12px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>admin </span>
      <el-button type="danger" size="mini" @click="loginout()">登出</el-button>
    </el-header>
    <el-main>
       <router-view></router-view>
    </el-main>


    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</el-container>
</template>

<script>

export default {
  name:"Home",

  methods:{
        loginout(){
             window.sessionStorage.removeItem('token')
             this.$router.push('/login')
        }
     }
}

</script>

<style scoped>
  .el-container {
    height: 100%;
  }
  
  .el-aside {
    background-color: #B3C0D1;
    color: #333;
    height: 100%;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
