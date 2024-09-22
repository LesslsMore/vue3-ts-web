<template>
  <el-button @click="s3test">s3test</el-button>
  <el-button @click="alist_test">alist_test</el-button>
  <el-button @click="alist_video_test">alist_video_test</el-button>

  <el-button type="primary" @click="setUrl()">setUrl</el-button>
  <!-- 准备一个容器用来存放音乐播放器 -->
  <div id="aplayer"></div>

  <div style="height: 450px; width: 800px;" class="artplayer"></div>
</template>

<script setup>
import {createClient} from "webdav";
import {onMounted, ref} from "vue";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import {NewPlayer} from "@/utils/player/player";
import {add_danmu} from "@/utils/player/danmu";

const client = createClient(
    "http://127.0.0.1:5244/dav",
    {
      username: "admin",
      password: "190036"
    }
);

async function listDirectory() {
  try {
    const directoryItems = await client.getDirectoryContents('/ali_o/30-Interest/1-Music');
    console.log('Directory contents:', directoryItems);
  } catch (error) {
    console.error('Error listing directory:', error);
  }
}

listDirectory()

async function getFileDownloadLink() {
  let downloadLink = client.getFileDownloadLink("/ali_o/30-Interest/1-Music/柯立可 - 我多想说再见啊（星尘Infinity）.mp3");
  console.log(downloadLink)
  downloadLink = 'http://127.0.0.1:5244/d/ali_o/30-Interest/1-Music/%E6%B4%9B%E5%A4%A9%E4%BE%9D%20-%20%E4%B8%80%E5%8D%8A%E4%B8%80%E5%8D%8A.mp3'
  let audio = [{url: downloadLink}]

  console.log('mounted')
  ap = new APlayer({
    container: document.getElementById("aplayer"),
    audio: audio, // 音乐信息
    ...info, // 其他配置信息
  });
}

function setUrl() {
  getFileDownloadLink()
}

const alist_url = 'http://127.0.0.1:5244';

async function alist_api_fs_get(file_path) {
  const alist_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicHdkX3RzIjoxNzE0Mzg4NzY3LCJleHAiOjE3MjI3NzgyMDcsIm5iZiI6MTcyMjYwNTQwNywiaWF0IjoxNzIyNjA1NDA3fQ.b2oCboweTFKKtmXpio_7dbAnEC-c1us8BvS7Kpaap1w'
  let data = JSON.stringify({
    "path": file_path,
    "password": "",
    "page": 1,
    "per_page": 0,
    "refresh": false
  });

  let config = {
    method: 'post',
    url: alist_url + '/api/fs/get',
    headers: {
      'Authorization': alist_token,
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json'
    },
    data: data
  };

  let response = await axios(config)
  console.log(response);
  let sign = response.data.data.sign
  let raw_url = response.data.data.raw_url
  let url = `${alist_url}/d${file_path}?sign=${sign}`
  console.log(url)
  return {url, raw_url}
}

async function alist_test() {
  const file_path = "/ali_o/30-Interest/1-Music/柯立可 - 我多想说再见啊（星尘Infinity）.mp3";
  let {url} = await alist_api_fs_get(file_path);

  let audio = [{url}]

  console.log('mounted')
  ap = new APlayer({
    container: document.getElementById("aplayer"),
    audio: audio, // 音乐信息
    ...info, // 其他配置信息
  });
}

async function alist_video_test() {
  const file_path = "/1-tjupt/富豪谷底求翻身.Undercover.Billionaire.2019.S01.1080p.WEB-DL.H264.AAC-LeagueWEB/Undercover.Billionaire.2019.S01E07.1080p.WEB-DL.H264.AAC-LeagueWEB.mp4";
  // const file_path = '/ali_o/30-Interest/2-Movie/地球上的星星.Taare.Zameen.Par.2007.BluRay.1080p.x265.10bit.MNHD-FRDS.mkv'
  let {url, raw_url} = await alist_api_fs_get(file_path);
  // let url = 'http://127.0.0.1:5244/p/1-tjupt/%E5%AF%8C%E8%B1%AA%E8%B0%B7%E5%BA%95%E6%B1%82%E7%BF%BB%E8%BA%AB.Undercover.Billionaire.2019.S01.1080p.WEB-DL.H264.AAC-LeagueWEB/Undercover.Billionaire.2019.S01E07.1080p.WEB-DL.H264.AAC-LeagueWEB.mp4?sign=7oGvVLiVu5MUD4lzExpds-q5AaHPYi2JM8gyK4aUJ3k=:0'

  let art = NewPlayer(raw_url, '.artplayer')
  add_danmu(art)
}

async function s3test() {
  const client = new S3Client({
    region: "us-west-2",
    endpoint: 'http://127.0.0.1:5246',
    credentials: {
      accessKeyId: 'Xz7C9p1v8QYmcbYLQs5q',
      secretAccessKey: 'SqcLMC9CAouFqO/++THWtZCRhD4QpqbqJY2af+Ff'
    }
  });

  const params = {
    /** input parameters */
  };
  const command = new ListBucketsCommand(params);

  const data = await client.send(command);

  console.log(data)
}

let ap
let info = {
  lrcType: 1,
  fixed: true, // 不开启吸底模式
  // listFolded: true, // 折叠歌曲列表
  listFolded: false,
  autoplay: true, // 开启自动播放
  preload: "auto", // 自动预加载歌曲
  loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
  order: "list", //  播放模式，list列表播放, random随机播放
}
let audio = ref([])

onMounted(() => {

})

</script>

<style scoped lang="scss">

</style>
