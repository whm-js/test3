import axios from 'axios'
import { AlertModule } from 'vux'
import Vue from 'vue'
import router from '@/router'
import store from '../store/store'

var baseUrl = 'http://101.37.24.216:3009/'
if (location.hostname === 'localhost') {
  baseUrl = 'http://118.178.92.150:3101/'
}

axios.defaults.timeout = 5000

// request拦截器
// var loadinginstace;
axios.interceptors.request.use(config => {
  Vue.$vux.loading.show()
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.transformRequest = [function (data, headers) {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      // url = url + '?' + dataStr;
    }
    return dataStr

    // let q = new URLSearchParams();
    // for (let i in data) {
    //     q.append(i, data[i]);
    // }
    // return q.toString();
  }]
  return config
}, error => {
  AlertModule.show({
    title: '提示',
    content: '加载超时'
  })
  return Promise.reject(error)
})

// response拦截器
axios.interceptors.response.use(data => {
  Vue.$vux.loading.hide()
  return data
}, error => {
  AlertModule.show({
    title: '提示',
    content: '加载失败'
  })
  return Promise.reject(error)
})

export default async (url, data, method = 'post') => {
  url = baseUrl + url
  // try {
  //     const response =await axios({
  //         method: method,
  //         url: url,
  //         data:data,
  //     })
  //     return response.data;
  // } catch (error) {
  //     Message.error(err);
  //     // throw new Error(error)
  // }

  let promise = new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: url,
      data: data
    }).then(function (res) {
      // console.log(store._actions)
      if (res.status !== 200) {
        store._actions.setSignOut[0]()
        store._actions.removeRotateInfoArr[0]()
        AlertModule.show({
          title: '提示',
          content: res.data.message,
          onHide () {
            router.push('/login')
          }
        })
        reject(res.data.message)
      }
      if (res.data.code !== 0) {
        if (res.data.code === -3003) {
          store._actions.setSignOut[0]()
          store._actions.removeRotateInfoArr[0]()
          AlertModule.show({
            title: '提示',
            content: res.data.message,
            onHide () {
              router.push('/login')
            }
          })
          reject(res.data.message)
        } else {
          AlertModule.show({
            title: '提示',
            content: res.data.message
          })
          reject(res.data.message)
        }
      } else {
        resolve(res.data)
      }
    }).catch(function (err) {
      // Message.error(err);
      AlertModule.show({
        title: '提示',
        content: err,
        onHide () {
          router.push('/login')
        }
      })
      reject(err)
    })
  })
  return promise
}
