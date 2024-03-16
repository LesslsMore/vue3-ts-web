import request from '@/utils/request'

export default{
// http://localhost:8088/list/1/10
  getPageList(data, page, size) {
    return request({
      url: `/list/${page}/${size}`,
      method: 'post',
      data
    })
  }
}
