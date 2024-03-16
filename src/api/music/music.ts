import request from '@/utils/request'

export default {
  get_music_list() {
    return request({
      url: `/list`,
      method: 'get'
    })
  },
}
