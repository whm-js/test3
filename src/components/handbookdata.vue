<template>
  <div class="handbookdata">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">轮转手册
    </x-header>
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <datetime :title="'培训日期'" :min-year=1900>
      </datetime>
      <x-input title="主讲人" placeholder-align="right" text-align="right" required is-type="china-name" :show-clear="true"></x-input>
      <x-input title="学时" placeholder-align="right" text-align="right" required :show-clear="true"></x-input>
      <datetime :title="'评价日期'" :min-year=1900>
      </datetime>
      <cell title="评价">
        <button-tab slot="title" v-model="pjindex" style="width:100px;">
          <button-tab-item @on-item-click="consoleIndex()">得分</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">评价</button-tab-item>
        </button-tab>

        <x-input v-show="pjindex === 0" placeholder-align="right" text-align="right" required placeholder="请输入得分" :show-clear="true"></x-input>
        <radio v-show="pjindex === 1" :options="radio1" @on-change="radiochange"></radio>
      </cell>
    </group>
  </div>
</template>

<script>
import { XButton, Group, XHeader, XInput, ButtonTab, ButtonTabItem, Cell, PopupPicker, Datetime, Radio } from 'vux'
import { mapGetters } from 'vuex'
import { addRotateRecord, setRotateRecord } from '@/http/data'
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
    Radio
  },
  data () {
    return {
      pjindex: 0,
      radio1: ['掌握', '熟练']
    }
  },
  created () {
    that = this
  },
  activated () {

  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userLoginInfo'
    ])
  },
  methods: {
    consoleIndex () {
      console.log(this.pjindex)
    },
    radiochange (value, label) {
      console.log(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.handbookdata {
  /* height: 100%; */
  margin-top: 50px;
  margin-bottom: 60px;
  margin-left: 5px;
  margin-right: 5px;
  /* background-color: white; */
}
.handbookdata .weui-check__label {
  width: 60px;
  float: left;
  border: 1px solid #eee;
  height: 22px;
}
.handbookdata .weui-cells_radio .weui-cell:before {
  display: none;
}
.handbookdata .weui-cell__bd {
  text-align: left;
}
</style>
