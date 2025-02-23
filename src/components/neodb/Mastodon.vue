<template>
  <div id="mt-container" class="mt-container">
  <div class="mt-body" role="feed">
    <div class="mt-loading-spinner"></div>
  </div>
</div>
</template>

<script setup>
import * as MastodonTimeline from "@idotj/mastodon-embed-timeline";

const myTimeline = new MastodonTimeline.Init({

  // 包含时间线的 <div> 的 ID
  mtContainerId: "mt-container",

  // Mastodon 实例的 URL，包含 https://
  instanceUrl: "https://mastodon.social",

  // 选择要在时间线中显示的帖子类型：'local', 'profile', 'hashtag'

  // 默认：local
  timelineType: "profile",

  // 你在 Mastodon 实例上的用户 ID 号

  // 如果你没有选择 'profile' 作为时间线类型，请留空
  userId: "110597079328678058",

  // 你在 Mastodon 实例上的用户名（包括开头的 @ 符号）
  // 如果你没有选择 'profile' 作为时间线类型，请留空
  profileName: "@lesslsmore",

  // 标签的名称（不包括 # 符号）
  // 如果你没有选择 'hashtag' 作为时间线类型，请留空
  hashtagName: "",

  // 加载旋转器的类名（也在 CSS 文件中使用）
  spinnerClass: "mt-loading-spinner",

  // 首选颜色主题：'light', 'dark' 或 'auto'
  // 默认：auto
  defaultTheme: "auto",

  // 向服务器请求的最大帖子数量
  // 默认：20
  maxNbPostFetch: "40",

  // 在时间线中显示的最大帖子数量
  // 默认：20
  maxNbPostShow: "20",

  // 根据选择的语言/国家指定日期格式
  // 默认：英式英语（日 - 月 - 年顺序）
  dateLocale: "en-US",

  // 使用选项自定义日期格式
  // 默认：DD MMM YYYY
  dateOptions: {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },

  // 隐藏未列出的帖子
  // 默认：不隐藏
  hideUnlisted: true,

  // 隐藏转发的帖子
  // 默认：不隐藏
  hideReblog: false,

  // 隐藏回复帖子
  // 默认：不隐藏
  hideReplies: true,

  // 从个人资料时间线中隐藏置顶帖子
  // 默认：不隐藏
  hidePinnedPosts: true,

  // 隐藏用户名下的用户账号
  // 默认：不隐藏
  hideUserAccount: false,

  // 将文本内容限制为最大行数
  // 使用 "0" 表示不显示文本
  // 默认：""（无限制）
  txtMaxLines: "",

  // 自定义用于显示/隐藏敏感/剧透文本的按钮文本
  btnShowMore: "显示更多",
  btnShowLess: "显示更少",

  // 将 Markdown 符号 ">" 转换为块引用 HTML 标签
  // 默认：false（不应用）
  markdownBlockquote: false,

  // 隐藏服务器上的自定义表情符号
  // 默认：不隐藏
  hideEmojos: false,

  // 自定义用于显示敏感/剧透媒体内容的按钮文本
  btnShowContent: "显示内容",

  // 隐藏视频预览并加载视频播放器
  // 默认：不隐藏
  hideVideoPreview: true,

  // 自定义用于加载和播放视频的按钮文本
  btnPlayVideoTxt: "加载并播放视频",

  // 如果帖子包含来自 URL 的链接、照片或视频，则隐藏预览卡片
  // 默认：不隐藏
  hidePreviewLink: true,

  // 将预览文本描述限制为最大行数
  // 使用 "0" 表示不显示文本
  // 默认：""（无限制）
  previewMaxLines: "",

  // 隐藏回复、转发和点赞的帖子计数器
  // 默认：不隐藏
  hideCounterBar: false,

  // 当用户点击帖子中的图片时显示轮播/灯箱
  // 默认：不关闭
  disableCarousel: false,

  // 自定义轮播/灯箱的按钮文本
  carouselCloseTxt: "关闭轮播",
  carouselPrevTxt: "上一个媒体项",
  carouselNextTxt: "下一个媒体项",

  // 自定义指向 Mastodon 页面的按钮文本，放置在时间线末尾
  // 留空以隐藏
  btnSeeMore: "查看更多帖子",

  // 自定义重新加载帖子列表的按钮文本，放置在时间线末尾
  // 留空以隐藏
  btnReload: "刷新",

  // 在构建时间线之前继续搜索主 <div> 容器。在某些情况下很有用，需要额外的时间来渲染页面
  // 默认：不应用
  insistSearchContainer: true,

  // 定义继续搜索主 <div> 容器的最长时间
  // 默认：3 秒
  insistSearchContainerTime: "3000",
});
</script>