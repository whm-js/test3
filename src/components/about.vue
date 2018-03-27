<template>
  <div class="about">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">关于我们
      <!-- <a slot="left"></a> -->
      <!-- <img @click="aaa" slot="left" width="35px;" src="../assets/user.png" style="margin-top: -8px;" /> -->
    </x-header>
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <cell :title="'当前版本'" :value="'最新版'"></cell>
      <cell :title="'服务QQ'" :value="'400-727-8900'"></cell>
      <cell :title="'免费咨询热线'" :value="'400-727-8900'"></cell>
      <cell :title="'微信公众号'" :value="'英腾医学教育'"></cell>
      <cell :title="'公司介绍'" :value="'400-727-8900'"></cell>
    </group>

    <div style="bottom: 20px; position: fixed; font-size: 14px; color: rgb(196, 196, 196); text-align: center; width: 99%;">
      <span>
        英腾教育科技股份有限公司
      </span> <br> <br>
      <span>
        Copyright © 2015-
        <span>2018</span> Yingedu.All Rights Reserved
      </span>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from 'vux'
// import { Flexbox, FlexboxItem, Divider } from 'vux'

export default {
  name: '',
  components: {
    Group,
    Cell,
    XHeader
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
.about {
  height: calc( 100% - 5px);
  margin-top: 50px;
  /* margin-bottom: 55px; */
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
}
</style>
