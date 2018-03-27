<template>
  <div class="resetpassword">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">修改密码
    </x-header>
    <group gutter="0" style="padding:0 5px;border-radius:5px;background-color:white;">
      <x-input type="password" v-model="oldPassWord" :min="3" :max="12" required placeholder="请输入原始密码" :is-type="passwordvalid" :show-clear="true"></x-input>
      <x-input type="password" v-model="newPassWord" :min="3" :max="12" required placeholder="请输入新密码" :is-type="passwordvalid" :show-clear="true"></x-input>
      <x-input type="password" v-model="newPassWord1" :min="3" :max="12" required placeholder="请再次输入新密码" :is-type="passwordvalid" :show-clear="true"></x-input>
    </group>

    <group gutter="20" style="padding:0 5px;">
      <x-button @click.native="reset" style="background-color:#37acd3;color:white;">确定修改</x-button>
      <p style="background-color:#eee;font-size:14px;margin-top:10px;">备注：密码长度为3-12位</p>
    </group>
  </div>
</template>

<script>
import { XButton, Group, XHeader, XInput } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { resetPassWord } from '@/http/data'
var that
export default {
  components: {
    XButton,
    Group,
    XHeader,
    XInput
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      oldPassWord: '',
      newPassWord: '',
      newPassWord1: ''
    }
  },
  created () {
    that = this
  },
  methods: {
    ...mapActions({ setSignOut: 'setSignOut' }),
    passwordvalid (password) {
      if (password.length < 3 || password.length > 12) {
        return { valid: false, msg: '密码长度为3-12位' }
      } else {
        return { valid: true }
      }
    },
    identicalvalid (password) {
      if (password !== this.newPassWord) {
        return { valid: false, msg: '两次输入的新密码不一致' }
      } else {
        return { valid: true }
      }
    },
    reset () {
      if (this.newPassWord !== this.newPassWord1) {
        this.$vux.toast.text('两次输入的新密码不一致', 'top')
        return
      }
      if (this.oldPassWord.length < 3 || this.oldPassWord.length > 12 || this.newPassWord.length < 3 || this.newPassWord.length > 12) {
        this.$vux.toast.text('密码长度为3-12位', 'top')
        return
      }
      resetPassWord(this.userLoginInfo.guid, this.oldPassWord, this.newPassWord).then(res => {
        that.setSignOut()
        that.$vux.alert.show({
          title: '提示',
          content: '修改密码成功',
          onHide () {
            that.$router.push('/login')
          }
        })
      })
    }
  }
}
</script>

<style>
.resetpassword {
  margin-top: 70px;
  margin-bottom: 60px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
