import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { MessageBox, Message } from 'element-ui'
// import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  // baseURL: 'https://lesslsmore-api.vercel.app/',
  // baseURL: 'http://127.0.0.1:8964',
  baseURL: 'http://127.0.0.1:5050',
  timeout: 15000 // 请求超时时间
})

export default service
