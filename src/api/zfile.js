import request from "@/utils/request.js";

// 获取存储源文件列表
const loadFileListReq = (data) => {
  return request({
    url: `/api/storage/files`,
    method: "post",
    data,
    config: {
      showDefaultMsg: false
    }
  })
}

const getFile = (url) => {
  return request({
    url: url,
    method: "get",
    config: {
      showDefaultMsg: false
    }
  })
}

export {
  loadFileListReq,
  getFile
}
