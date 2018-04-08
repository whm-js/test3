<template>
  <div class="login">
    <div class="logo"></div>

    <group gutter="0" style="padding:10px 20px;border-radius:5px;">
      <x-input v-model="username" required placeholder="请输入用户名" :max="10" :show-clear="true">
        <img slot="label" style="width:20px;margin-right:10px;margin-top:5px;" src="../assets/username.png" />
      </x-input>
      <x-input v-model="password" required placeholder="请输入用户名" type="password" :show-clear="true">
        <img slot="label" style="width:20px;margin-right:10px;margin-top:5px;" src="../assets/password.png" />
      </x-input>
    </group>

    <x-button @click.native="loginClick" :gradients="['#38ACD3','#38ACD3']" style="width: 90%;height: 50px;">登录</x-button>
  </div>
</template>

<script>
import { XInput, XButton, Group } from 'vux'
import { userLogin } from '@/http/data'
import { mapActions } from 'vuex'
var that
export default {
  name: '',
  components: {
    XInput,
    XButton,
    Group
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    that = this
  },
  methods: {
    ...mapActions({ setUserLoginInfo: 'setUserLoginInfo' }),
    loginClick () {
      userLogin(this.username, this.password).then(res => {
        that.setUserLoginInfo(res.datas)
        let role = res.datas.user.role
        switch (role) {
          case '护士':
            that.$router.push('/index/rotatedepartment')
            break
          case '护士导师':
            that.$router.push('/dsexitManage/dsexitInfo')
            break
          case '护士长':
            that.$router.push('/hsz_index/hsz_nurseEntry')
            break
          default:
            that.$router.push('/index/rotatedepartment')
            break
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login {
  height: 100%;
}
.login .logo {
  /* z-index: 9; */
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 280px;
  background: url(../assets/loginImg.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.login .weui-cells {
  background-color: #eee;
}
</style>
