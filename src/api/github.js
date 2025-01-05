import request from "@/utils/request.js";

// 获取存储源文件列表
const loadFileListReq = (data) => {
  const {owner, repo, path, ref} = data
  return request({
    url: `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`,
    method: "get",
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
