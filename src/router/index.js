import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import rotatedepartment from '@/components/rotate_department'
import hszindex from '@/components/hsz_index'
// import rotateplan from '@/components/rotate_plan'
// import userinfo from '@/components/userinfo'
// import about from '@/components/about'
// import customerservice from '@/components/customerservice'
// import userinfoEdit from '@/components/userinfoEdit'
// import nurseexit from '@/components/nurseexit'

const rotateplan = r => require.ensure([], () => r(require('@/components/rotate_plan')))
const userinfo = r => require.ensure([], () => r(require('@/components/userinfo')))
const about = r => require.ensure([], () => r(require('@/components/about')))
const customerservice = r => require.ensure([], () => r(require('@/components/customerservice')))
const userinfoEdit = r => require.ensure([], () => r(require('@/components/userinfoEdit')))
const nurseexit = r => require.ensure([], () => r(require('@/components/nurseexit')))
const resetpassword = r => require.ensure([], () => r(require('@/components/resetpassword')))
const handbookmainpage = r => require.ensure([], () => r(require('@/components/handbookmainpage')))
const handbookdata = r => require.ensure([], () => r(require('@/components/handbookdata')))
const dsexitManage = r => require.ensure([], () => r(require('@/components/ds_exitManage')))
const hsznurseentry = r => require.ensure([], () => r(require('@/components/hsz_nurseEntry')))
const hsznurseexit = r => require.ensure([], () => r(require('@/components/hsz_nurseExit')))
const hsznurseinfolist = r => require.ensure([], () => r(require('@/components/hsz_nurseInfoList')))
const hsztraningmanage = r => require.ensure([], () => r(require('@/components/hsz_traningManage')))
const dsexitInfo = r => require.ensure([], () => r(require('@/components/ds_exitInfo')))
const dsguideHistory = r => require.ensure([], () => r(require('@/components/ds_guideHistory')))
const hszapproveentry = r => require.ensure([], () => r(require('@/components/hsz_approveEntry')))
const dslookExit = r => require.ensure([], () => r(require('@/components/ds_lookExit')))
const bmap = r => require.ensure([], () => r(require('@/components/bmap')))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/bmap',
      name: 'bmap',
      component: bmap
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [{
        path: '/index/rotatedepartment',
        name: 'rotatedepartment',
        component: rotatedepartment
      },
      {
        path: '/index/userinfo',
        name: 'userinfo',
        component: userinfo
      },
      {
        path: '/index/rotateplan',
        name: 'rotateplan',
        component: rotateplan
      }]
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/customerservice',
      name: 'customerservice',
      component: customerservice
    },
    {
      path: '/userinfoEdit',
      name: 'userinfoEdit',
      component: userinfoEdit
    },
    {
      path: '/nurseexit',
      name: 'nurseexit',
      component: nurseexit
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: resetpassword
    },
    {
      path: '/handbookmainpage',
      name: 'handbookmainpage',
      component: handbookmainpage
    },
    {
      path: '/handbookdata',
      name: 'handbookdata',
      component: handbookdata
    },
    {
      path: '/dsexitManage',
      name: 'dsexitManage',
      component: dsexitManage,
      children: [{
        path: '/dsexitManage/dsexitInfo',
        name: 'dsexitInfo',
        component: dsexitInfo
      },
      {
        path: '/dsexitManage/userinfo',
        name: 'dsuserinfo',
        component: userinfo
      },
      {
        path: '/dsexitManage/dsguideHistory',
        name: 'dsguideHistory',
        component: dsguideHistory
      }]
    },
    {
      path: '/dslookExit',
      name: 'dslookExit',
      component: dslookExit
    },
    {
      path: '/',
      name: 'hsz_index',
      component: hszindex,
      children: [{
        path: '/hsz_index/hsz_nurseEntry',
        name: 'hsz_nurseEntry',
        component: hsznurseentry
      },
      {
        path: '/hsz_index/hsz_nurseExit',
        name: 'hsz_nurseExit',
        component: hsznurseexit
      },
      {
        path: '/hsz_index/hsz_nurseInfoList',
        name: 'hsz_nurseInfoList',
        component: hsznurseinfolist
      },
      {
        path: '/hsz_index/hsz_traningManage',
        name: 'hsz_traningManage',
        component: hsztraningmanage
      }]
    },
    {
      path: '/hsz_approveEntry',
      name: 'hsz_approveEntry',
      component: hszapproveentry
    }
  ]
})
