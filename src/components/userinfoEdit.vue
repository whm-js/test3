<template>
  <div class="userinfoEdit">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">个人资料
      <span slot="right" @click="saveuserinfo">保存</span>
    </x-header>
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <div style="text-align:center;">
        <img src="../assets/user.png" width="100px" />
      </div>

      <x-input title="姓名" v-model="userInfo.real_name" placeholder-align="right" text-align="right" required placeholder="请输入学员姓名" is-type="china-name" :show-clear="true"></x-input>
      <cell title="性别">
        <button-tab v-model="userInfo.sex" style="width:100px;">
          <button-tab-item @on-item-click="consoleIndex()">女</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">男</button-tab-item>
        </button-tab>
      </cell>
      <x-input title="手机号码" v-model="userInfo.telephone" placeholder-align="right" text-align="right" :max="11" is-type="china-mobile" placeholder="请输入手机号码" :show-clear="true"></x-input>
      <popup-picker :title="'专业'" :popup-title="'请选择专业'" :data="professionpopuplist" v-model="professionpopupvalue"></popup-picker>
      <popup-picker :title="'职级'" :popup-title="'请选择职级'" :data="levelpopuplist" v-model="levelpopupvalue"></popup-picker>
      <!-- <cell title="职级">
        <span @click="showpopup">{{userInfo.level||'请选择职级'}}</span>
      </cell> -->
      <cell title="护士执业证书">
        <button-tab v-model="userInfo.certificate" style="width:100px;">
          <button-tab-item @on-item-click="consoleIndex()">无</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">有</button-tab-item>
        </button-tab>
      </cell>
      <!-- <cell title="职称">
        <span>{{userInfo.title||'请选择职称'}}</span>
      </cell> -->
      <popup-picker :title="'职称'" :popup-title="'请选择职称'" :data="titlepopuplist" v-model="titlepopupvalue"></popup-picker>
      <!-- <cell title="出生日期">
        <span>{{userInfo.birthday||'请选择出生日期'}}</span>
      </cell> -->
      <datetime v-model="userInfo.birthday" :title="'出生日期'" :min-year=1900>
      </datetime>
      <!-- <cell title="学历">
        <span>{{userInfo.education||'请选择学历'}}</span>
      </cell> -->
      <popup-picker :title="'学历'" :popup-title="'请选择学历'" :data="educationpopuplist" v-model="educationpopupvalue"></popup-picker>
      <x-input title="毕业院校" v-model="userInfo.school" placeholder-align="right" text-align="right" placeholder="请输入毕业院校" :show-clear="true"></x-input>

      <datetime v-model="userInfo.graduated_year" format="YYYY" :title="'毕业时间'" :min-year=1950>
      </datetime>
      <datetime v-model="userInfo.join_year" format="YYYY" :title="'来院时间'" :min-year=1950>
      </datetime>
      <datetime v-model="userInfo.job_year" format="YYYY" :title="'参加工作时间'" :min-year=1950>
      </datetime>

      <!-- <cell title="获得职称时间">
        <span>{{userInfo.title_date||'请选择获得职称时间'}}</span>
      </cell> -->
      <datetime v-model="userInfo.title_date" :title="'获得职称时间'" :min-year=1950>
      </datetime>
      <!-- <cell title="获得证书时间">
        <span>{{userInfo.certificate_date||'请选择获得证书时间'}}</span>
      </cell> -->
      <datetime v-model="userInfo.certificate_date" :title="'获得证书时间'" :min-year=1950>
      </datetime>
      <!-- <cell title="家庭住址">
        <span>{{userInfo.address||'请选择家庭住址'}}</span>
      </cell> -->
      <x-address title="家庭住址" v-model="addressValue" :list="addressData" raw-value></x-address>

      <!-- <x-input title="身份证号" placeholder-align="right" text-align="right" :max="18" :is-type="testid" placeholder="请输入手机号码" :show-clear="true"></x-input> -->

    </group>

  </div>
</template>

<script>
import { XButton, Group, XHeader, XInput, ButtonTab, ButtonTabItem, Cell, PopupPicker, Datetime, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { updateUserInfo } from '@/http/data'

var that
export default {
  name: '',
  components: {
    XButton,
    Group,
    XHeader,
    XInput,
    ButtonTab,
    ButtonTabItem,
    Cell,
    PopupPicker,
    Datetime,
    XAddress
  },
  data () {
    return {
      showdepartment: false,
      sex: 0,
      userData: {},
      professionpopuplist: [['护理', '助产']],
      professionpopupvalue: [],
      levelpopuplist: [['N0', 'N1', 'N2', 'N3', 'N4', 'N5']],
      levelpopupvalue: [],
      titlepopuplist: [['护士', '护师', '中级主管护师', '副主任护师', '主任护师']],
      titlepopupvalue: [],
      educationpopuplist: [['大专', '本科', '硕士', '博士']],
      educationpopupvalue: [],
      addressData: ChinaAddressV4Data,
      addressValue: []
    }
  },
  created () {
    that = this
  },
  activated () {
    if (this.professionpopupvalue.length === 0) {
      this.professionpopupvalue.push(this.userInfo.profession)
    }
    if (this.levelpopupvalue.length === 0) {
      this.levelpopupvalue.push(this.userInfo.level)
    }
    if (this.titlepopupvalue.length === 0) {
      this.titlepopupvalue.push(this.userInfo.title)
    }
    if (this.educationpopupvalue.length === 0) {
      this.educationpopupvalue.push(this.userInfo.education)
    }
    if (this.addressValue.length === 0) {
      let a = this.userInfo.address.split(' ')
      this.addressValue = a
      console.log(a)
    }
  },
  watch: {
    professionpopupvalue: function (newdata) {
      this.userInfo.profession = newdata[0]
      // console.log(this.userInfo.level)
    },
    levelpopupvalue: function (newdata) {
      this.userInfo.level = newdata[0]
      // console.log(this.userInfo.level)
    },
    titlepopupvalue: function (newdata) {
      this.userInfo.title = newdata[0]
      // console.log(this.userInfo.level)
    },
    educationpopupvalue: function (newdata) {
      this.userInfo.education = newdata[0]
      // console.log(this.userInfo.level)
    },
    addressValue: function (newdata) {
      this.userInfo.address = this.getName(newdata)
      // console.log(this.userInfo.address+'--'+newdata)
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userLoginInfo'
    ])
  },
  methods: {
    ...mapActions({
      removeUserInfo: 'removeUserInfo'
    }),
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    showpopup () {
      this.popuplist = [['N0', 'N1', 'N2', 'N3', 'N4', 'N5']]
      this.popupShow = true
    },
    saveuserinfo () {
      // this.pageindex = 1
      console.log(this.userInfo.address)
      var params = {
        guid: this.userLoginInfo.guid,
        id: this.userInfo.id,
        user_name: this.userInfo.user_name,
        real_name: this.userInfo.real_name,
        role: this.userInfo.role,
        depart_id: this.userInfo.depart_id,
        profession: this.userInfo.profession,
        level: this.userInfo.level,
        education: this.userInfo.education,
        school: this.userInfo.school,
        graduated_year: this.userInfo.graduated_year,
        certificate: this.userInfo.certificate,
        certificate_date: this.userInfo.certificate_date,
        title: this.userInfo.title,
        title_date: this.userInfo.title_date,
        address: this.userInfo.address,
        join_year: this.userInfo.join_year,
        job_year: this.userInfo.job_year,
        birthday: this.userInfo.birthday,
        telephone: this.userInfo.telephone,
        sex: this.userInfo.sex,
        batch: this.userInfo.batch,
        operate_user: this.userInfo.operate_user
      }
      updateUserInfo(params).then(res => {
        if (res.code === 0) {
          that.removeUserInfo()
          that.$vux.toast.text('保存成功！')
          that.$router.push('/index/userinfo')
        }
        // console.log(res)
      })
    },
    selectdepartment () {
      this.showdepartment = true
      console.log(this.showdepartment)
    },
    consoleIndex () {
      console.log('男女', this.userInfo.sex)
    },
    testid (id) {
      var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/

      if (!format.test(id)) {
        return { valid: false, msg: '身份证号码不合规' }
      }

      var year = id.substr(6, 4)

      var month = id.substr(10, 2)

      var date = id.substr(12, 2)

      var time = Date.parse(month + '-' + date + '-' + year)

      var nowtime = Date.parse(new Date())
      var dates = (new Date(year, month, 0)).getDate()
      if (time > nowtime || date > dates) {
        return { valid: false, msg: '出生日期不合规' }
      }

      var c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

      var b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

      var idarray = id.split('')
      var sum = 0
      for (var k = 0; k < 17; k++) {
        sum += parseInt(idarray[k]) * parseInt(c[k])
      }
      if (idarray[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
        return { valid: false, msg: '身份证校验码不合规' }
      }
      return { valid: true }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.userinfoEdit {
  /* height: 100%; */
  margin-top: 50px;
  margin-bottom: 60px;
  margin-left: 5px;
  margin-right: 5px;
  /* background-color: white; */
}
</style>
