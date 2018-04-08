<template>
  <div>
    <x-header style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">进行审核</x-header>
    <div style="margin:58px 5px;">
      <div style="clear: both;height:30px;line-height: 30px;text-align: center;">
        <h3 style="float:left;width:85%;">岗前教育</h3>
        <icon type="info-circle" style="float:right;width:15%;"></icon>
      </div>
      <div style="clear: both;">
        <group>
          <cell primary="content">
            <p style="line-height: 30px;color:#333;">
              <span style="float: left;text-align: left;">内容</span>
              <span style="display: inline-block;">
                <checklist label-position="right" :options="commonList" v-model="checkedlist"></checklist>
              </span>
            </p>
            <p style="clear: left;font-size: 16px;text-align: left;color:#333;line-height: 45px;">
              <span style="display: inline-block;width:31.333333%"> 8个学时 </span>
              <span style="display: inline-block;width:40.333333%"> 2018-05-02 </span>
              <span style="display: inline-block;width:24.333333%"> 通过 </span>
            </p>
          </cell>
          <!-- <cell primary="content" v-else>
            <p style="font-size: 28px;text-align: center;">暂无学员提交的出科数据！</p>
          </cell> -->
        </group>
        <!-- <div style="margin-top: 15px;" v-if="handbookData.length>=1" v-if="handbookData.length>=1" v-show="handbookData[0].RotateStatus>100">
          <x-button>提交审核</x-button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { XButton, Group, Cell, Checklist, XHeader, Icon } from 'vux'
import { mapGetters } from 'vuex'
import { getRotateRecordForTutor } from '@/http/data'
export default {
  components: {
    XButton,
    Group,
    Cell,
    Checklist,
    XHeader,
    Icon
  },
  data () {
    return {
      handbookData: [],
      userId: '',
      commonList: ['不通过'],
      checkedlist: []
    }
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  created () {
    this.getHandbookInfos()
  },
  activated () {
    // 接收参数中的userId
    this.userId = this.$route.query.userId
  },
  methods: {
    // 获取学员个人轮转手册信息
    getHandbookInfos (userId) {
      var that = this
      getRotateRecordForTutor(this.userLoginInfo.guid, this.$route.query.userId).then(res => {
        that.handbookData = res.datas
      })
    }
    /*
      导师提交审核接口/rotate/submitTeacherComment
参数：
guid,
serialId,(轮转计划的序列id)
teacherComment(学员个人总结)
tutorAduit (导师审核轮转计划培训内容)
auditResult (导师审核是否通过.  0:否   1:是)

    */
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
