<template>
<!-- <el-form ref="form" :model="loginform" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="loginform.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type="password" v-model="loginform.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
  </el-form-item>
</el-form> -->

    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="loginform" >
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginform.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginform.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="login" style="margin-left: 105px;margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  name:"Login",
  data () {
    return {
        loginform: {
          username: 'admin',
          password: '123',
        }
    }
  },
  created(){
    //this.login()
  },
  methods:{
    login(){
        console.log(this)
        this.$axios.post('/login/index',this.loginform)
            .then(res => {
                if(res.data.status == 200){
                    console.log(res.data.token)
                    //弹框提示
                    this.$message({
                        message: '登录成功！',
                        type: 'success'
                    });
                    window.sessionStorage.setItem('token',res.data.token)//token存入session

                    //路由跳转
                    this.$router.push('/home')

                } else if(res.data.status == 300){
                    this.$message.error('用户名不存在！')
                } else if(res.data.status == 301){
                    this.$message.error('密码错误！')
                } else{
                    this.$message.error('登录失败！')
                }
            })
            .catch(error=>{
                console.log(error)
                this.$message.error('登录失败！');
            })
    }
  }
}

</script>

<style scoped>
</style>
