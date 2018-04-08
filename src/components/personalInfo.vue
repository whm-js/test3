<template>
  <div style="margin:5px;">
    <group label-align="left">
      <cell title="姓名" :value="personalData.real_name"></cell>
      <cell title="性别" :value="personalData.sex ? '男' : '女'"></cell>
      <cell title="手机号码" :value="personalData.telephone ? personalData.telephone : '-'"></cell>
      <cell title="科室" :value="personalData.depart_name ? personalData.depart_name : '-'"></cell>
      <cell title="护士执业证书" :value="personalData.certificate ? '有' : '无'"></cell>
      <cell title="学历" :value="personalData.education ? personalData.education : '-'"></cell>
      <cell title="参加工作时间" :value="personalData.job_year ? personalData.job_year : '-'"></cell>
      <cell title="来院时间" :value="personalData.join_year ? personalData.join_year : '-'"></cell>
      <cell title="获得证书时间" :value="personalData.certificate_date ? personalData.certificate_date : '-'"></cell>
      <cell title="获得职称时间" :value="personalData.title_date ? personalData.title_date : '-'"></cell>
      <cell title="毕业院校" :value="personalData.school ? personalData.school : '-'"></cell>
      <cell title="毕业时间" :value="personalData.graduated_year ? personalData.graduated_year : '-'"></cell>
      <cell title="出生年月" :value="personalData.birthday ? personalData.birthday : '-'"></cell>
      <cell title="家庭住址" :value="personalData.address ? personalData.address : '-'"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapGetters } from 'vuex'
import { getUserInfos } from '@/http/data'
export default {
  props: {
    personalData: Object
  },
  components: {
    Group,
    Cell
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      personal: {}
    }
  },
  created () {
    // this.getUserData()
  },
  methods: {
    getUserData () {
      var that = this
      getUserInfos(this.userLoginInfo.guid, this.UseID).then(res => {
        that.personalData = res.datas
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
