import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export default class API {
  request
  constructor(server) {
    const service = axios.create({
      baseURL: server,
      timeout: 15000 // 请求超时时间
    })

    service.interceptors.response.use(
        response => {
          const res = response.data

          // if the custom code is not 20000, it is judged as an error.
          if (res.code !== 200) {
            ElMessage({
              message: res.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
              // to re-login
              ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }).then(() => {
                // store.dispatch('user/resetToken').then(() => {
                //   location.reload()
                // })
              })
            }
            return Promise.reject(new Error(res.message || 'Error'))
          } else {
            return res
          }
        },
        error => {
          console.log('err' + error) // for debug
          ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
        }
    )

    this.request = service
  }
  get_music_list() {
    return this.request({
      url: `/list`,
      method: 'get'
    })
  }
  setConf(path){
    return this.request({
      url: `/scan/conf`,
      method: 'post',
      data: {
        'scan_path': path
      }
    })
  }
  setPath(path){
    return this.request({
      url: `/scan/path/${path}`,
      method: 'post',
    })
  }
  getSongs(path) {
    return this.request({
      url: `/song/${path.join('/')}`,
      method: 'post'
    })
  }
  getOrScanSongs(path) {
    return this.request({
      url: `/scan/song/${path.join('/')}`,
      method: 'post'
    })
  }
  getOrScanFolds(path) {
    if (path.length > 0) {
      return this.request({
        url: `/scan/fold/${path.join('/')}`,
        method: 'post'
      })
    } else {
      let fold = 'E:/T'
      return this.request({
        url: `/fold/${fold}`,
        method: 'post'
      })
    }
  }
  getFolds(path) {
    if (path.length > 0) {
      return this.request({
        url: `/fold/${path.join('/')}`,
        method: 'post'
      })
    } else {
      return this.request({
        url: `/fold//`,
        method: 'post'
      })
    }
  }
}
