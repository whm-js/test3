<template>
  <div class="userinfo">
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <div style="text-align:center;">
        <img src="../assets/user.png" width="100px" />
        <p>姓名({{userData.user_name}})</p>
        <!-- <span style="font-size:20px;"></span> -->
      </div>
      <cell :title="'账号角色'" :value="userData.role"></cell>
      <cell :title="'所在科室'" :value="userData.depart_name"></cell>
      <cell :title="'学员学历'" :value="userData.education"></cell>
      <cell :title="'学员职称'" :value="userData.title"></cell>
      <cell :title="'是否职业护士'" :value="userData.certificate===0?'否':'是'"></cell>
      <cell :title="'获得证书时间'" :value="userData.certificate_date"></cell>
    </group>

    <group gutter="10px" style="padding:0 5px;border-radius:5px;background-color:white;">
      <cell :title="'个人资料'" :link="{path:'/userinfoEdit'}">
        <i slot="icon" class="icon iconfont icon-my_icon iconstyle"></i>
      </cell>
    </group>

    <group gutter="10px" style="padding:0 5px;border-radius:5px;background-color:white;">
      <cell :title="'客服中心'" :link="{path:'/customerservice'}">
        <i slot="icon" class="icon iconfont icon-icon_phone iconstyle"></i>
      </cell>
    </group>

    <group gutter="10px" style="padding:0 5px;border-radius:5px;background-color:white;">
      <cell :title="'关于我们'" :link="{path:'/about'}">
        <i slot="icon" class="icon iconfont icon-jihe iconstyle"></i>
      </cell>
    </group>

    <group gutter="10px" style="padding:0 5px;background-color:#eee;">
      <x-button :link="'/resetpassword'" style="width:45%;float:left;background-color:#37acd3;color:white;">修改密码</x-button>
      <x-button @click.native="signout" style="width:45%;float:right;margin:0;background-color:#37acd3;color:white;">退出账号</x-button>
    </group>

  </div>
</template>

<script>
import { getUserInfo } from '@/http/data'
import { XButton, Group, Cell, Badge } from 'vux'
import { mapActions, mapGetters } from 'vuex'

var that
export default {
  name: '',
  components: {
    XButton,
    Group,
    Cell,
    Badge
  },
  computed: {
    ...mapGetters([
      'userLoginInfo',
      'userInfo'
    ])
  },
  data () {
    return {
      showdepartment: false,
      pagetitle: '轮转科室',
      userData: {}
    }
  },
  created () {
    that = this
  },
  activated () {
    if (!this.userInfo.hasOwnProperty('id')) {
      getUserInfo(this.userLoginInfo.guid).then(res => {
        that.setUserInfo(res.datas)
        that.userData = res.datas
        // that.username = res.data.username;
      })
    } else {
      this.userData = this.userInfo
    }
    console.log(this.userData)
  },
  methods: {
    ...mapActions({
      setUserInfo: 'setUserInfo',
      setSignOut: 'setSignOut',
      removeRotateInfoArr: 'removeRotateInfoArr'}),
    signout () {
      this.setSignOut()
      this.removeRotateInfoArr()
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.userinfo {
  /* height: 100%; */
  margin-top: 50px;
  margin-bottom: 60px;
  margin-left: 5px;
  margin-right: 5px;
  /* background-color: white; */
}
.userinfo .iconstyle {
  font-size: 18px;
  margin-right: 5px;
  font-weight: bold;
}
</style>
