<template>
<!-- 出科页面 -->
  <div class="nurseexit">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">出科详情
    </x-header>
    <group gutter="0">
      <cell :title="'轮转科室'" :value="rotateInfo.depart_name"></cell>
      <cell style="border-bottom: 1px solid #D9D9D9;" :title="'轮转时间'" :value="`${rotateInfo.plan_start}至${rotateInfo.plan_end}`"></cell>
    </group>

    <group :title="'个人总结'">
      <x-textarea v-model="exitsummary" :max="200" :placeholder="'请提交完成个人总结后点击申请出科'" :height="150" :show-counter="false"></x-textarea>
    </group>
    <!-- <x-button @click.native="applyexit" style="background-color:#37acd3;color:white;margin-top:10px;">申请出科</x-button> -->
    <group :title="'科室评价'" v-if="rotateInfo.status!==100&&rotateInfo.status!==101&&rotateInfo.status!==0">
      <x-textarea v-model="TeacherComment" readonly :max="200" :height="150" :show-counter="false"></x-textarea>
    </group>

    <div v-if="rotateInfo.status===104||rotateInfo.status===200">护士长评价： {{exitData.Appraise}}</div>

    <div style="bottom: 1px; position: fixed; font-size: 14px; color: rgb(196, 196, 196); text-align: center; width: 99%;">
      <x-button @click.native="applyexit" style="background-color:#37acd3;color:white;">{{rotateInfo.status===100?'申请出科':'修改个人总结'}}</x-button>
      <!-- <x-button style="width:45%;float:right;margin:0;background-color:#37acd3;color:white;margin-right:5px;">取消</x-button> -->
    </div>
  </div>
</template>

<script>
import { Group, Cell, XHeader, XTextarea, XButton } from 'vux'
import { submitPersonSummary, getExitCourse } from '@/http/data'
import { mapGetters } from 'vuex'
var that
export default {
  name: '',
  components: {
    Group,
    Cell,
    XHeader,
    XTextarea,
    XButton
  },
  computed: {
    ...mapGetters([
      'userLoginInfo',
      'rotateInfo'
    ])
  },
  data () {
    return {
      showdepartment: false,
      exitsummary: '',
      TeacherComment: '',
      exitData: {}
    }
  },
  created () {
    that = this
  },
  activated () {
    if (this.rotateInfo.status !== 100 && this.rotateInfo.status !== 0) {
      getExitCourse(this.userLoginInfo.guid, this.rotateInfo.serial_id).then(res => {
        // console.log(res.datas)
        that.exitsummary = res.datas.items[0].PersonalSummary
        that.TeacherComment = res.datas.items[0].TeacherComment
        that.exitData = res.datas.items[0]
        // this.$vux.toast.text('申请出科成功', 'top')
      })
    }
  },
  methods: {
    aaa () {
      this.pageindex = 1
    },
    selectdepartment () {
      this.showdepartment = true
      console.log(this.showdepartment)
    },
    applyexit () {
      if (this.exitsummary === '') {
        this.$vux.toast.text('请先填写个人总结！', 'top')
        return
      }
      submitPersonSummary(this.userLoginInfo.guid, this.rotateInfo.serial_id, this.exitsummary).then(res => {
        // console.log(res.datas)
        if (that.rotateInfo.status === 100) {
          that.$vux.toast.text('申请出科成功', 'top')
        } else {
          that.$vux.toast.text('修改个人总结成功', 'top')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.nurseexit {
  height: calc(100% - 5px);
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
