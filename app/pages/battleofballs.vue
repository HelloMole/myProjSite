<template>
  <div class="battleofballs-container">
    <!-- 顶部导航栏 -->
    <nav class="top-nav" :class="{ 'nav-scrolled': currentPage > 0 }">
      <div class="nav-content">
        <div class="logo">
          <img src="/battleofballs/imgi_46_logo.png" alt="球球大作战" />
        </div>
        <div class="flexGrow"></div>
        <ul class="nav-tabs">
          <li 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="{ active: currentPage === index }"
            @click="scrollToPage(index)"
          >
            <a v-if="index === 5" :href="tab.link" target="_blank">{{ tab.name }}</a>
            <span v-else>{{ tab.name }}</span>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 全屏滚动容器 -->
    <div class="scroll-container" ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll">
      <!-- 第一页：官网首页 -->
      <section class="page page-home" ref="page0">
        <div class="home-bg">
          <img src="/battleofballs/imgi_76_home_bg_first.jpg" alt="背景" class="bg-image" />
        </div>
        <div class="home-content">
          <div class="download-cards">
            <a-flex gap="small" style="background-color: #fff; padding: 10px; border-radius: 20px; width: 492px; height: 152px; margin-top: 450px;">
                <img style="flex-shrink: 0; width: 155px; height: 133px;" src="/battleofballs/imgi_54_download_qrcode2.png" alt="appstore" />
                <a-flex vertical gap="4" >
                    <img style="width: 189px; height: 66px;" src="/battleofballs/imgi_55_download_ios2.png" alt="appstore" />
                    <img style="width: 189px; height: 66px;" src="/battleofballs/imgi_56_download_android2.png" alt="appstore" />
                </a-flex>
                <img style="width: 140px; height: 142px; margin-top: -8px;" src="/battleofballs/imgi_57_download_recharge2.png" alt="appstore" />
            </a-flex>
          </div>
        </div>
      </section>

      <!-- 第二页：最新资讯 -->
      <section class="page page-news" ref="page1">
        <div class="news-container" >
          <!-- <div class="news-container-bg"> -->
          <div class="news-left">
            <div class="image-carousel" ref="newsCarousel">
              <div 
                class="carousel-wrapper"
                :style="{ transform: `translateX(-${newsImageIndex * 100}%)` }"
              >
                <div 
                  class="carousel-item" 
                  v-for="(img, index) in newsImages" 
                  :key="index"
                >
                  <img :src="`/myProjSite${img}`" :alt="`资讯图片${index + 1}`" />
                </div>
              </div>
            </div>
            <div class="carousel-dots">
              <span 
                v-for="(img, index) in newsImages" 
                :key="index"
                :class="{ active: newsImageIndex === index }"
                @click="newsImageIndex = index"
              ></span>
            </div>
          </div>
          <div class="news-right">
            <div class="news-tabs">
              <div 
                class="news-tab"
                v-for="(tab, index) in newsTabs"
                :key="index"
                :class="{ active: currentNewsTab === index }"
                @click="currentNewsTab = index"
              >
                <div class="news-tab-bg">
                    <div>{{ tab.name }}</div>
                </div>
              </div>
            </div>
            <div class="news-list">
              <div 
                class="news-item"
                v-for="(item, index) in currentNewsList"
                :key="index"
              >
                <div class="news-item-title">{{ item.title }}</div>
                <div class="news-item-date">{{ item.date }}</div>
              </div>
            </div>
          </div>
          </div>
        <!-- </div> -->
      </section>

      <!-- 第三页：玩法介绍 -->
      <section class="page page-gameplay" ref="page2">
        <div class="gameplay-container">
          <div class="gameplay-carousel" ref="gameplayCarousel">
            <div 
              class="gameplay-item"
              v-for="(img, index) in gameplayImages"
              :key="index"
              :style="getGameplayItemStyle(index)"
            >
              <img :src="`/myProjSite${img}`" :alt="`玩法图片${index + 1}`" />
            </div>
          </div>
          <div class="carousel-dots">
            <span 
              v-for="(img, index) in gameplayImages" 
              :key="index"
              :class="{ active: gameplayIndex === index }"
              @click="gameplayIndex = index"
            ></span>
          </div>
          <div class="carousel-controls">
            <div class="carousel-btn prev-btn" @click="prevGameplayImage">
              <img src="/battleofballs/imgi_67_gameplay_left_btn.png" alt="上一张" />
            </div>
            <div class="carousel-btn next-btn" @click="nextGameplayImage">
              <img src="/battleofballs/imgi_68_gameplay_right_btn.png" alt="下一张" />
            </div>
          </div>
        </div>
      </section>

      <!-- 第四页：IP档案 -->
      <section class="page page-ip" ref="page3">
        <div class="ip-container">
          <div class="ip-cards">
            <div 
              class="ip-card"
              v-for="(ip, index) in ipCharacters"
              :key="index"
              :class="{ active: currentIpIndex === index }"
              @click="selectIp(index)"
            >
              <div class="ip-card-content">
                <img :src="`/myProjSite${ip.card}`" :alt="ip.name" />
              </div>
              <div class="ip-card-name">{{ ip.nameCn }}</div>
            </div>
          </div>
          <transition name="ip-slide" mode="out-in">
            <div class="ip-detail" v-if="currentIpIndex !== null" :key="currentIpIndex">
              <div class="ip-character">
                <img :src="`/myProjSite${ipCharacters[currentIpIndex].character}`" :alt="ipCharacters[currentIpIndex].name" />
              </div>
              <div class="ip-info">
                <div class="ip-info-bg">
                  <div class="ip-info-content">
                    <div class="ip-info-title">
                      <!-- <div class="ip-info-label">Roles</div> -->
                      <div class="ip-info-name">
                        <img :src="`/myProjSite${ipCharacters[currentIpIndex].info}`" :alt="ipCharacters[currentIpIndex].nameCn" />
                      </div>
                    </div>
                    <div class="ip-info-details">
                      <div class="ip-info-item">
                        <span class="label">性别:</span>
                        <span class="value">{{ ipCharacters[currentIpIndex].gender }}</span>
                      </div>
                      <div class="ip-info-item">
                        <span class="label">星座:</span>
                        <span class="value">{{ ipCharacters[currentIpIndex].zodiac }}</span>
                      </div>
                      <div class="ip-info-item">
                        <span class="label">角色:</span>
                        <span class="value">{{ ipCharacters[currentIpIndex].role }}</span>
                      </div>
                    </div>
                    <div class="ip-info-description">
                      {{ ipCharacters[currentIpIndex].description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- 第五页：关注球球 -->
      <section class="page page-social" ref="page4">
        <div class="social-container">
          <div class="social-cards">
            <div 
              class="social-card"
              v-for="(social, index) in socialLinks"
              :key="index"
              @mouseenter="handleSocialHover(index)"
              @mouseleave="handleSocialLeave(index)"
              @click="handleSocialClick(social)"
            >
              <div class="social-icon">
                <img :src="`/myProjSite${social.icon}`" :alt="social.name" />
              </div>
              <div class="social-qrcode" v-if="social.qrcode && hoveredSocialIndex === index">
                <img :src="`/myProjSite${social.qrcode}`" :alt="social.name + '二维码'" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="social-footer" style=" text-align: center; color: #fff; font-size: 0.8rem; margin-top: 1rem;">本页面仅为个人练习作品，与球球官方无关</div> -->
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, createVNode} from 'vue'
import { message , Modal} from 'ant-design-vue';

// Tab配置
const tabs = [
  { name: '官网首页', link: '' },
  { name: '一手资讯', link: '' },
  { name: '玩法介绍', link: '' },
  { name: 'IP档案', link: '' },
  { name: '关注球球', link: '' },
  { name: '电糖社区', link: 'https://www.campfires.cn/?s=qiuqiu_guanwang' }
]



// 当前页面索引
const currentPage = ref(0)
const scrollContainer = ref(null)
const isScrolling = ref(false)
const isToggleByWheel = ref(false)

// 页面引用
const page0 = ref(null)
const page1 = ref(null)
const page2 = ref(null)
const page3 = ref(null)
const page4 = ref(null)

// 滚动到指定页面
const scrollToPage = (index) => {
  if (index === 5) return // 电糖社区直接跳转
  console.log('scrollToPage 是否滚动', isScrolling.value, currentPage.value, index)
  if (isScrolling.value && Math.abs(currentPage.value - index) <= 1) return
  
  isScrolling.value = true
  currentPage.value = index
  
  const pages = [page0, page1, page2, page3, page4]
  if (pages[index]?.value) {
    pages[index].value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      isScrolling.value = false
    }, 300)
  }
}

setTimeout(() => {
    // scrollToPage(2)
    // message.warn('本页面仅为个人练习作品，与球球大作战官方无关')

    Modal.confirm({
        title: '本页面仅为个人练习作品，与球球大作战官方无关',
        content: createVNode('div', { style: 'color:red;' }, '球球大作战官方网站网址为：https://www.battleofballs.com/index/'),
        okText: '继续浏览本页面',
        cancelText: '打开官网',
        onOk() {
            
        },
        onCancel() {
            window.open('https://www.battleofballs.com/index/', '_blank')
        },
    });
}, 1000);

// 处理滚轮事件
let wheelTimer = null
const handleWheel = (e) => {
  console.log('handleWheel是否滚动', isScrolling.value)
  if (isScrolling.value) {
    e.preventDefault()
    return
  }
  
  e.preventDefault()
  
//   // 防抖处理
//   if (wheelTimer) {
//     clearTimeout(wheelTimer)
//   }
  
//   wheelTimer = 

  if(isToggleByWheel.value) {
    return
  }
  isToggleByWheel.value = true
  realCheckNeedScroll(e)
  setTimeout(() => {
    isToggleByWheel.value = false
  }, 1200)
}

const realCheckNeedScroll = (e) => {
    if (e.deltaY > 0) {
        // 向下滚动
        if (currentPage.value < 4) {
        scrollToPage(currentPage.value + 1)
        }
    } else {
        // 向上滚动
        if (currentPage.value > 0) {
        scrollToPage(currentPage.value - 1)
        }
    }
}

// 处理滚动事件
const handleScroll = () => {
  if (isScrolling.value) return
  
  // 检测当前可见的页面
  const pages = [page0, page1, page2, page3, page4]
  const viewportHeight = window.innerHeight
  
  pages.forEach((page, index) => {
    if (page.value) {
      const pageRect = page.value.getBoundingClientRect()
      // 如果页面顶部在视口中间位置以上，且底部在视口中间位置以下
      if (pageRect.top <= viewportHeight / 2 && pageRect.bottom >= viewportHeight / 2) {
        if (currentPage.value !== index) {
          currentPage.value = index
        }
      }
    }
  })
}

// 第二页：最新资讯
const newsImages = ref([
  '/battleofballs/imgi_2_news_banner1.jpg',
  '/battleofballs/imgi_3_news_banner2.jpg',
  '/battleofballs/imgi_4_news_banner3.jpg',
  '/battleofballs/imgi_5_news_banner4.jpg',
  '/battleofballs/imgi_6_news_banner5.jpg',
  '/battleofballs/imgi_7_news_banner6.jpg',
  '/battleofballs/imgi_9_news_banner8.jpg'
])
const newsImageIndex = ref(0)
const newsTabs = ref([
  { name: '最新' },
  { name: '新闻' },
  { name: '活动' },
  { name: '攻略' }
])
const currentNewsTab = ref(0)
const newsCarousel = ref(null)

// 模拟新闻数据
const newsData = {
  0: [
    { title: '匹配、段位、外挂与账号安全——球球大作战史上最大改动计划公开', date: '2024-01-15' },
    { title: '可旋转雪花幻化上新！原来世间每一片雪花都是限量版！', date: '2024-01-10' },
    { title: '雪熊少爷（圣诞版）驾到！通通闪开！【圣诞巡游记】12.19限时上线！', date: '2024-01-05' },
    { title: '圣诞福利超！前！爆！料！金蘑菇塔全员0元爬！？.19限时上线！', date: '2024-01-05' },
    { title: '注意！这些球正在演你！从质疑老六到成为老六！.19限时上线！', date: '2024-01-05' },
  ],
  1: [
    { title: '限时活动：双倍经验开启', date: '2024-01-14' },
    { title: '周末狂欢活动', date: '2024-01-08' },
    { title: '春节特别活动预告', date: '2024-01-01' }
  ],
  2: [
    { title: '版本2.0更新内容', date: '2024-01-12' },
    { title: '性能优化更新', date: '2024-01-03' },
    { title: '新功能上线', date: '2023-12-28' }
  ],
  3: [
    { title: '【官包安装指南】中秋福利即将来袭|官包安装指南，助力轻松重返球球！', date: '2024-01-12' },
    { title: '“两面包夹芝士”下的极限反杀', date: '2024-01-03' },
    { title: '一颗球逆风翻盘的操作，你学不学', date: '2023-12-28' },
    { title: '如何在一波三折中取得胜利', date: '2023-12-28' },
    { title: '帅气花式五连速学', date: '2023-12-28' }
  ]
}

const currentNewsList = computed(() => {
  return newsData[currentNewsTab.value] || []
})

// 自动播放资讯图片
let newsCarouselTimer = null
const startNewsCarousel = () => {
  newsCarouselTimer = setInterval(() => {
    newsImageIndex.value = (newsImageIndex.value + 1) % newsImages.value.length
  }, 3000)
}

// 第三页：玩法介绍
const gameplayImages = ref([
  '/battleofballs/imgi_11_game_banner5.jpg',
  '/battleofballs/imgi_12_game_banner6.jpg',
  '/battleofballs/imgi_13_game_banner7.jpg',
  '/battleofballs/imgi_14_game_banner1.jpg',
  '/battleofballs/imgi_15_game_banner2.jpg',
  '/battleofballs/imgi_16_game_banner3.jpg',
  '/battleofballs/imgi_17_game_banner4.jpg'
])
const gameplayIndex = ref(0)
const gameplayCarousel = ref(null)

const prevGameplayImage = () => {
  gameplayIndex.value = (gameplayIndex.value - 1 + gameplayImages.value.length) % gameplayImages.value.length
}

const nextGameplayImage = () => {
  gameplayIndex.value = (gameplayIndex.value + 1) % gameplayImages.value.length
}

// 获取玩法介绍图片的位置和样式
const getGameplayItemStyle = (index) => {
  const total = gameplayImages.value.length
  const current = gameplayIndex.value
  const diff = index - current
  
  // 处理循环，找到最短路径
  let normalizedDiff = diff
  if (normalizedDiff > total / 2) {
    normalizedDiff = normalizedDiff - total
  } else if (normalizedDiff < -total / 2) {
    normalizedDiff = normalizedDiff + total
  }
  
  // 计算位置和缩放参数
  const maxVisible = 2 // 只显示中间及左右各2张图片（共5张可见）
  const imageMaxWidth = remToPx(4.4) // 图片最大宽度
  const overlapRatio = 0.1 // 10%重叠
  const baseOffset = imageMaxWidth * (1 - overlapRatio) // 630px，实现10%重叠
  const scaleStep = 0.15 // 每张图片的缩放差
  const minScale = 0.65 // 最小缩放比例
  const maxScale = 1.0 // 最大缩放比例（中间）
  
  if (Math.abs(normalizedDiff) > maxVisible) {
    return {
      transform: `translateX(${normalizedDiff * baseOffset}px) translateY(-50%) scale(0.5)`,
    //   opacity: 0,
      zIndex: 0,
      pointerEvents: 'none'
    }
  }
  
  const offset = normalizedDiff * baseOffset
  const scale = Math.max(minScale, maxScale - Math.abs(normalizedDiff) * scaleStep)
//   const opacity = Math.max(0.5, 1 - Math.abs(normalizedDiff) * 0.25)
  const zIndex = 10 - Math.abs(normalizedDiff)
  
  return {
    transform: `translateX(${offset}px) translateY(-50%) scale(${scale})`,
    // opacity: opacity,
    zIndex: zIndex,
    pointerEvents: 'auto'
  }
}

// 第四页：IP档案
const ipCharacters = ref([
  { 
    name: 'Lolo',
    nameCn: '咯洛洛',
    card: '/battleofballs/imgi_30_card_lolo.png',
    character: '/battleofballs/imgi_18_character_lolo.png',
    info: '/battleofballs/imgi_19_name_lolo.png',
    gender: '男',
    zodiac: '双子座',
    role: '冒险家',
    description: '咯洛洛是球球世界的冒险家，充满好奇心和探索精神！外表活泼开朗，内心勇敢无畏。他独特的魅力吸引了许多伙伴。球球们说："看到咯洛洛的灿烂笑容，连星空都会融化。"'
  },
  { 
    name: 'Fae',
    nameCn: '菲露露',
    card: '/battleofballs/imgi_31_card_fae.png',
    character: '/battleofballs/imgi_20_character_fae.png',
    info: '/battleofballs/imgi_21_name_fae.png',
    gender: '女',
    zodiac: '狮子座',
    role: '交际花',
    description: '菲露露是球球世界的交际花，天生的外交家，拥有出色的情商！外表甜美纯真，内心女王范十足。她独特的魅力吸引了许多追求者。球球们说："看到菲露露的灿烂笑容，连星空都会融化。"'
  },
  { 
    name: 'Hatta',
    nameCn: '哈嗒',
    card: '/battleofballs/imgi_32_card_hatta.png',
    character: '/battleofballs/imgi_22_character_hatta.png',
    info: '/battleofballs/imgi_23_name_hatta.png',
    gender: '男',
    zodiac: '射手座',
    role: '旅行者',
    description: '哈嗒是球球世界的旅行者，热爱自由和冒险！外表阳光开朗，内心充满热情。他独特的魅力吸引了许多朋友。球球们说："看到哈嗒的灿烂笑容，连星空都会融化。"'
  },
  { 
    name: 'Gulo',
    nameCn: '咕噜咕噜',
    card: '/battleofballs/imgi_33_card_gulo.png',
    character: '/battleofballs/imgi_24_character_gulo.png',
    info: '/battleofballs/imgi_25_name_gulo.png',
    gender: '男',
    zodiac: '白羊座',
    role: '战士',
    description: '咕噜咕噜是球球世界的战士，勇敢无畏，充满力量！外表强壮有力，内心坚定执着。他独特的魅力吸引了许多追随者。球球们说："看到咕噜咕噜的灿烂笑容，连星空都会融化。"'
  },
  { 
    name: 'Seren',
    nameCn: '希哩哩',
    card: '/battleofballs/imgi_34_card_seren.png',
    character: '/battleofballs/imgi_26_character_seren.png',
    info: '/battleofballs/imgi_27_name_seren.png',
    gender: '女',
    zodiac: '天秤座',
    role: '魔法师',
    description: '希哩哩是球球世界的魔法师，拥有神秘的力量！外表优雅美丽，内心充满智慧。她独特的魅力吸引了许多仰慕者。球球们说："看到希哩哩的灿烂笑容，连星空都会融化。"'
  },
  { 
    name: 'Tatan',
    nameCn: '塔坦',
    card: '/battleofballs/imgi_35_card_tatan.png',
    character: '/battleofballs/imgi_28_character_tatan.png',
    info: '/battleofballs/imgi_29_name_tatan.png',
    gender: '男',
    zodiac: '金牛座',
    role: '守护者',
    description: '塔坦是球球世界的守护者，稳重可靠，值得信赖！外表温和友善，内心充满责任感。他独特的魅力吸引了许多伙伴。球球们说："看到塔坦的灿烂笑容，连星空都会融化。"'
  }
])
const currentIpIndex = ref(0)

const selectIp = (index) => {
  currentIpIndex.value = index
}

// 第五页：关注球球
const socialLinks = ref([
  { name: 'Tatan', icon: '/battleofballs/imgi_36_social_tatan.png', qrcode: '/battleofballs/imgi_49_download_qrcode.png', link: '' },
  { name: 'QQ', icon: '/battleofballs/imgi_37_social_qq.png', qrcode: '/battleofballs/imgi_49_download_qrcode.png', link: '' },
  { name: '微信', icon: '/battleofballs/imgi_38_social_wechat.png', qrcode: '/battleofballs/imgi_49_download_qrcode.png', link: '' },
  { name: '微博', icon: '/battleofballs/imgi_39_social_weibo.png', link: 'https://weibo.com' },
  { name: '抖音', icon: '/battleofballs/imgi_40_social_douyin.png', link: 'https://www.douyin.com' },
  { name: 'B站', icon: '/battleofballs/imgi_41_social_bili.png', link: 'https://www.bilibili.com' },
  { name: '小红书', icon: '/battleofballs/imgi_42_social_xiaohongshu.png', link: 'https://www.xiaohongshu.com' },
  { name: '快手', icon: '/battleofballs/imgi_43_social_kuaishou.png', link: 'https://www.kuaishou.com' }
])
const hoveredSocialIndex = ref(-1)

const handleSocialHover = (index) => {
  hoveredSocialIndex.value = index
}

const handleSocialLeave = (index) => {
  hoveredSocialIndex.value = -1
}

const handleSocialClick = (social) => {
  if (social.link) {
    window.open(social.link, '_blank')
  }
}

let docFontSize = 16
function initFontSize(){
    const cw = document.documentElement.clientWidth
    const ch = document.documentElement.clientHeight
    // console.log('cw', cw, 'ch', ch)
    if(ch == 210){
        docFontSize = 16
        document.documentElement.style.fontSize = '16px'
    }else{
        docFontSize = ch / 210 * 16
        document.documentElement.style.fontSize = ch / 210 * 16 + 'px'
    }

}

function pxToRem(px){
    return px / docFontSize
}

function remToPx(rem){
    return rem * docFontSize
}

onMounted(() => {
  initFontSize()
  window.onresize = () => {
    initFontSize()
  } 
  startNewsCarousel()
  // 默认选中第一个IP
  currentIpIndex.value = 0


})

onUnmounted(() => {
  if (newsCarouselTimer) {
    clearInterval(newsCarouselTimer)
  }
  if (wheelTimer) {
    clearTimeout(wheelTimer)
  }
})
</script>

<style scoped>
.battleofballs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.flexGrow{
    flex-grow: 2;
    width: 1px;
    height: 1px;
  }

/* 顶部导航栏 */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* background: rgba(0, 0, 0, 0.3); */
  /* backdrop-filter: blur(10px); */
  transition: all 0.3s ease;
}

.top-nav.nav-scrolled {
  /* background: rgba(0, 0, 0, 0.8); */
}

.nav-content {
  /* max-width: 1400px; */
  /* margin: 0 auto; */
  /* width: 1000px; */
  padding: 20px 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo img {
  height: 50px;
  width: auto;
}

.nav-tabs {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.nav-tabs li {
  color: #fff;
  font-size: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 18px 8px 50px;
  /* width: 2rem; */
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-wrap: nowrap;
}

.nav-tabs li::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0%;
  background: #fff url('/battleofballs/imgi_47_nav_bg.png') no-repeat 0;
  background-size: 50px 40px;
  overflow: hidden;
  border-radius: 0px;
  /* background-position: bottom center; */
  transition: height 0.2s;
  z-index: 0;
}

.nav-tabs li:hover::before,
.nav-tabs li.active::before {
  height: 100%;
}

.nav-tabs li span,
.nav-tabs li a {
  position: relative;
  z-index: 1;
}

.nav-tabs li:hover {
  color: #000;
}

.nav-tabs li.active {
  color: #000;
}

.nav-tabs li.active::after {
  display: none;
}

.nav-tabs li a {
  color: inherit;
  text-decoration: none;
}

/* 滚动容器 */
.scroll-container {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* 页面通用样式 */
.page {
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
}

/* 第一页：官网首页 */
.page-home {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-content {
  position: relative;
  z-index: 2;
  margin-top: 200px;
}

.download-cards {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.download-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.download-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.2);
}

.download-card img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.download-card span {
  color: #fff;
  font-size: 14px;
}

/* 第二页：最新资讯 */
.page-news {
  background: url('/battleofballs/imgi_59_page2_bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-container {
  background: url('/battleofballs/imgi_60_page2_frame.png') no-repeat;
  background-size: 100% auto;
  width: 17rem; 
  height: 8.55rem;
  position: absolute;
  transform: translate(-40%, -50%);
  z-index: 20;
  left: 50%;
  top: 50%;

  /* width: 1699px;
  height: 854px; */
  /* width: 1000px; */
  /* max-width: 1400px; */
  /* max-height: 1200px; */
  /* padding: 0 40px; */
  display: flex;
  /* gap: 60px; */
  /* align-items: center; */
}

.news-container-bg {
    max-width: 1400px;
    width: 100%;
    padding: 0 40px;
    display: flex;
    gap: 60px;
    align-items: center;
}

.news-left {
  /* background-color: #000; */
  /* flex: 1; */
  border-radius: 0.2rem;
  height: 6.4rem;
  overflow: hidden;
  position: relative;
  width: 9rem;
  margin-top: 0.65rem;
  margin-left: 0.62rem;
  /* left: 0.08rem;
  top: -0.8rem; */
  /* flex-shrink: 0; */
}

.image-carousel {
  position: relative;
  width: 100%;
  height: 5.65rem;
  border-radius: 0.2rem;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  background-color: #ffd700;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  margin-top: 0.3rem;
}

.carousel-dots span {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background: #ffd700;
  /* background: rgba(255, 255, 255, 0.5); */
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dots span.active {
  background: #ffd700;
  width: 0.6rem;
  border-radius: 0.1rem;
}

.news-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* background-color: #000; */
  margin-top: 1rem;
  height: 5.4rem;
  width: fit-content;
  /* width: 5rem; */
  margin-left: 0rem;
  /* max-width: 500px; */
}

.news-tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0px;
  background-color: rgba(228, 233, 231, 0.74);
  border-radius: 0.26rem;
  height: 0.53rem;
  width: fit-content;
  /* margin-bottom: 30px; */
}

.news-tab {
  color: #000;
  border-radius: 0.26rem;
  cursor: pointer;
  font-size: 0.28rem;
  height: 0.53rem;
  width: 1.42rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.news-tab::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: url("/battleofballs/imgi_75_news_tab_bg.png") 0px center / auto 0.53rem no-repeat;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.news-tab:hover::before,
.news-tab.active::before {
  width: 100%;
}

.news-tab-bg {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.3s ease;
}

.news-tab:hover .news-tab-bg,
.news-tab.active .news-tab-bg {
  color: #fff;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 80%;
  margin-top: 0.2rem;
}

.news-item {
  padding: 0.2rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.08rem;
  /* backdrop-filter: blur(10px); */
  transition: all 0.3s ease;
  cursor: pointer;
}

.news-item:hover {
  background: rgba(15, 180, 0, 0.2);
  transform: translateX(10px);
}

.news-item-title {
  color: #000;
  opacity: 0.8;
  font-size: 0.2rem;
  font-weight: 500;
  margin-bottom: 0.08rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}

.news-item-date {
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.14rem;
}

/* 第三页：玩法介绍 */
.page-gameplay {
  background: url('/battleofballs/imgi_66_page3_bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gameplay-container {
  position: absolute;
  top:55%;
  transform: translate(-24%,-50%);
  /* max-width: 1400px; */
  height: 9.3rem;
  width: 13.8rem;
  /* min-width: 12.1rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 0 40px; */
}

.gameplay-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* perspective: 1200px; */
}

.gameplay-item {
  position: absolute;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  top: 50%;
  /* left: 50%; */
  transform-origin: center center;
  will-change: transform, opacity;
  border-radius: 0.4rem;
  overflow: hidden;
}

.gameplay-item:hover {
  cursor: pointer;
}

.gameplay-item img {
  /* width: auto;
  height: auto;
  max-width: 700px;
  max-height: 450px; */
  height: 8.59rem;
  width: 6.95rem;
  object-fit: contain;
  display: block;
  /* border-radius: 16px; */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  user-select: none;
}

.gameplay-item:hover img {
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.4);
  transform: scale(1.02);
}

.carousel-controls {
  position: absolute;
  /* bottom: 80px; */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6rem;
  z-index: 10;
}

.carousel-btn {
  /* background: rgba(255, 255, 255, 0.3); */
  /* border: none; */
  /* border-radius: 50%; */
  width: 0.7rem;
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  /* backdrop-filter: blur(10px); */
}

.carousel-btn:hover {
  /* background: rgba(255, 255, 255, 0.4); */
  transform: scale(1.1);
}

.carousel-btn img {
  width: 1rem;
  height: 1rem;
}

/* 第四页：IP档案 */
.page-ip {
  background: url('/battleofballs/imgi_69_page4_bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ip-container {
  width: 100%;
  max-width: 1400px;
  padding: 0 40px;
  position: relative;
  min-height: 600px;
}

.ip-cards {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 20;
  align-items: flex-end;
}

.ip-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.06rem;
  border-radius: 0.3rem;
  height: 2.02rem;
  width: 1.84rem;

  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.ip-card-content {
  width: 100%;
  height: 100%;
  border-radius: 0.3rem;

 
}

.ip-card:hover ,
.ip-card.active  {
  transform: translateY(-20px) rotate(-20deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.ip-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ip-card-name {
  margin-top: 0.06rem;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
}

.ip-card:hover .ip-card-name,
.ip-card.active .ip-card-name {
  color: #ffd700;
  /* transform: translateY(-5px); */
}

.ip-detail {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  /* gap: -10rem; */
  align-items: center;
  justify-content: center;
  /* padding: 0 40px; */
  z-index: 10;
}

.ip-character {
  /* flex: 1; */
  /* padding-left: 3rem; */
  /* width: 8rem; */
  height: 8rem;
  margin-right: -1rem;
  margin-bottom: 1.4rem;
}

.ip-character img {
  /* width: 100%; */
  height: 100%;
  /* max-width: 10rem; */
  /* height: auto; */
  /* margin-right: -5rem; */
  object-fit: cover;
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.ip-info {
  /* flex: 1; */
  max-width: 600px;
}

.ip-info-bg {
  animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.ip-info-bg {
  background-image: url('/battleofballs/imgi_71_ip_info_bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0.6rem 1rem;
  min-height: 6.4rem;
  position: relative;
  width: 100%;
  /* max-width: 600px; */
}

.ip-info-content {
  position: relative;
  z-index: 1;
}

.ip-info-title {
  margin-bottom: 30px;
}

.ip-info-label {
  font-size: 0.14rem;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.ip-info-name {
  margin-top: 0.4rem;
  margin-left: 0.6rem;
  display: flex;
  align-items: center;
}

.ip-info-name img {
  max-width: 300px;
  height: auto;
  object-fit: contain;
}

.ip-info-details {
  margin-top: -0.2rem;
  margin-bottom: 0.6rem;
  padding-left: 0.3rem;
}

.ip-info-item {
  display: flex;
  margin-bottom: 12px;
  font-size: 0.2rem;
}

.ip-info-item .label {
  color: #666;
  margin-right: 8px;
  min-width: 60px;
}

.ip-info-item .value {
  color: #333;
  font-weight: 500;
}

.ip-info-description {
  color: #555;
  font-size: 15px;
  line-height: 1.8;
  text-align: justify;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(500px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.ip-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.ip-slide-leave-active {
  transition: all 0.3s ease;
}

.ip-slide-enter-from {
  opacity: 0;
}

.ip-slide-enter-to {
  opacity: 1;
}

.ip-slide-leave-from {
  opacity: 1;
}

.ip-slide-leave-to {
  opacity: 0;
}

/* 第五页：关注球球 */
.page-social {
  background: url('/battleofballs/imgi_72_page5_bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-container {
  /* width: 100%; */
  /* max-width: 1200px; */
  width:  10rem;
  padding: 0 40px;
  margin-right: 8rem;
  margin-bottom: 2rem;
}

.social-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
}

.social-card {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.social-card:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.social-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.social-card:hover .social-icon {
  transform: scale(1.2);
}

.social-icon img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.social-qrcode {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.social-qrcode img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 响应式设计 */
/* @media (max-width: 768px) {
  .nav-content {
    padding: 15px 20px;
  }
  
  .nav-tabs {
    gap: 15px;
    font-size: 14px;
  }
  
  .logo img {
    height: 40px;
  }
  
  .download-cards {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .news-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .social-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .ip-detail {
    flex-direction: column;
    gap: 30px;
  }
  
} */
</style>
