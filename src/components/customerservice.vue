<template>
  <div class="customerservice">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">客服中心
      <!-- <a slot="left"></a> -->
      <!-- <img @click="aaa" slot="left" width="35px;" src="../assets/user.png" style="margin-top: -8px;" /> -->
    </x-header>
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <div style="text-align:center;">
        <img src="../assets/customer_service.png" width="150px" />
      </div>
      <cell :title="'免费咨询热线'" :value="'400-727-8900'"></cell>
      <cell :title="'客服QQ'" :value="'400-727-8900'"></cell>
    </group>

    <div style="margin-top:30px;margin-bottom:30px;text-align:center;">
      <span>
        客服电话的服务时间为每天的
        <span style="color: rgb(55, 172, 211);">8:00-21:00</span>
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
.customerservice {
  height: calc(100% - 5px);
  margin-top: 50px;
  /* margin-bottom: 55px; */
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
}
</style>
