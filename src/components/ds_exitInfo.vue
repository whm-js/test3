<template>
  <div style="margin:55px 5px;">
    <group>
      <cell primary="content" v-if="exitUserData.length>=1">
        <p style="color:#37acd3;line-height: 30px;">
          <span style="float: left;text-align: left;font-weight: bold;border-bottom: 1px solid #37acd3;" @click="showPersonalInfo(exitUserData[0].UserId)">{{exitUserData[0].RealName}}（{{exitUserData[0].UserName}}）</span>
          <span :style="exitUserData.isZY ? 'background-color:#03b503':'background-color:#ccc;'" style="display: inline-block;width: 30px;height:30px;color:#fff;text-align:center;line-height: 30px;border-radius: 6px;"> 执 </span>
        </p>
        <p style="clear: left;font-size: 16px;text-align: left;color:#333;line-height: 45px;">
          <span> 计划轮转时间：{{exitUserData[0].PlanStartDate}} 至 {{exitUserData[0].PlanEndDate}}</span>
          <badge :text="'（'+exitUserData[0].PlanDuration+'个月）'"></badge>
        </p>
        <p style="font-size: 16px;">{{exitUserData[0].RotateStatus===100?'未申请出科':(exitUserData[0].RotateStatus===101?'导师未审核':(exitUserData[0].RotateStatus===102?'导师审核不通过':(exitUserData[0].RotateStatus===103?'护士长未审核':(exitUserData[0].RotateStatus===104?'护士长审核不通过':(exitUserData[0].RotateStatus===200?'已出科':'未入科')))))}}</p>
      </cell>
      <cell primary="content" v-else>
        <p style="font-size: 28px;text-align: center;">暂无学员出科数据！</p>
      </cell>
    </group>
    <div style="margin-top: 15px;" v-if="exitUserData.length>=1" v-show="exitUserData[0].RotateStatus>100">
      <x-button @click.native="applyexit(exitUserData[0].UserId)">{{exitUserData[0].RotateStatus===101?'进行审核':(exitUserData[0].RotateStatus===102?'重新审核':(exitUserData[0].RotateStatus===103?'修改审核':'查看审核'))}}</x-button>
    </div>
    <!--显示个人信息弹窗-->
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div style="height: 550px;overflow-y: auto;overflow-x: hidden;">
          <personalInfo :personalData="personalData"></personalInfo>
        </div>
        <div @click="showToast=false">
          <span class="vux-close" style="margin: 8px 0px;"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { XButton, Group, Cell, Badge, XDialog, TransferDomDirective as TransferDom } from 'vux'
import { mapGetters } from 'vuex'
import { getRotatePlanInfo, getUserInfos } from '@/http/data'
import personalInfo from '@/components/personalInfo'
export default {
  directives: {
    TransferDom
  },
  components: {
    XButton,
    Group,
    Cell,
    Badge,
    XDialog,
    personalInfo
  },
  data () {
    return {
      showToast: false,
      exitUserData: [],
      personalData: {}
    }
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  created () {
    var that = this
    // 参数顺序：guid, planstartdate 计划入科时间, planenddate 计划出科时间, rotatestatus 轮转状态, realityenddate 实际出科时间
    // 针对轮转状态，与接口端约定：传1002，返回 已入科但未出科的数据
    getRotatePlanInfo(this.userLoginInfo.guid, '', '', 1002).then(res => {
      that.exitUserData = res.datas.items
    })
  },
  activated () {
  },
  methods: {
    // 获取学员个人信息弹窗
    showPersonalInfo (userId) {
      this.showToast = true
      var that = this
      getUserInfos(this.userLoginInfo.guid, userId).then(res => {
        that.personalData = res.datas
      })
    },
    // 查看轮转手册，进行审批
    applyexit (userId) {
      this.$router.push({
        path: '/dslookExit',
        name: 'dslookExit',
        query: {
          userId: userId
        }
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
.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .vux-close {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 10px;
  }
}
</style>
