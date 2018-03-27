<template>
  <div class="nurseexit">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">申请出科
    </x-header>
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <cell :title="'轮转科室'" :value="'内科'"></cell>
      <cell style="border-bottom: 1px solid #D9D9D9;" :title="'轮转时间'" :value="'2018-1-10至2018-2-10'"></cell>
      <div style="text-align:center;margin-top:20px;">个人总结</div>
      <x-textarea :max="200" name="detail" :placeholder="'请提交完成个人总结后点击申请出科'" :height="200" :show-counter="false"></x-textarea>
    </group>

    <div style="bottom: 20px; position: fixed; font-size: 14px; color: rgb(196, 196, 196); text-align: center; width: 99%;">
      <x-button @click.native="applyexit" style="width:45%;float:left;background-color:#37acd3;color:white;">申请出科</x-button>
      <x-button style="width:45%;float:right;margin:0;background-color:#37acd3;color:white;margin-right:5px;">取消</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XHeader, XTextarea, XButton } from 'vux'
// import { Flexbox, FlexboxItem, Divider } from 'vux'

export default {
  name: '',
  components: {
    Group,
    Cell,
    XHeader,
    XTextarea,
    XButton
  },
  data () {
    return {
      showdepartment: false,
      pagetitle: '轮转科室',
      userData: {}
    }
  },
  methods: {
    aaa () {
      this.pageindex = 1
    },
    selectdepartment () {
      this.showdepartment = true
      console.log(this.showdepartment)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.nurseexit {
  height: calc(100% - 5px);
  margin-top: 50px;
  /* margin-bottom: 55px; */
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
}
</style>
