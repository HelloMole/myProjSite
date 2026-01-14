<template>
  <div class="project-detail-container" :style="{ background: token.colorBgLayout }">
    <a-button type="link" @click="goBack" style="margin-bottom: 16px;">
      <ArrowLeftOutlined />
      返回首页
    </a-button>

    <a-card v-if="project" :bordered="false" class="detail-card">
      <template #title>
        <div class="project-header">
          <div class="project-icon">
            <ThunderboltOutlined v-if="project.type === 'tool'" />
            <ReadOutlined v-if="project.type === 'read'" />
            <StockOutlined v-if="project.type === 'finance'" />
            <BookOutlined v-if="project.type === 'education'" />
            <Gameicon  v-if="project.type === 'game'" />
          </div>
          <a-space>
            <div>{{ project.name }}</div>
            <a-tag :color="project.tagColor" >{{ project.role }}</a-tag>
          </a-space>
        </div>
      </template>

      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="项目时间">
          <CalendarOutlined />
          {{ project.date }}
        </a-descriptions-item>
        <a-descriptions-item label="项目类型">
          <TagOutlined />
          {{ getProjectTypeName(project.type) }}
        </a-descriptions-item>
      </a-descriptions>

      <a-divider>项目描述</a-divider>
      <div class="project-description">
        <p>{{ project.description }}</p>
      </div>

      <a-divider>项目业绩</a-divider>
      <div class="project-achievements">
        <a-alert
          :message="project.achievements"
          type="success"
          show-icon
          :icon="h(StarOutlined)"
        />
      </div>

      <div v-if="project.details" class="project-details">
        <a-divider>详细内容</a-divider>
        <div v-html="project.details"></div>
      </div>

      <div v-if="project.previewImgs && project.previewImgs.length > 0" class="preview-images">
        <a-divider>预览图</a-divider>
        <a-flex>
          <div class="preview-image-list">
            <a-image
              v-for="img in project.previewImgs"
              :key="img"
              :src="img"
              :preview="false"
              style="margin-right: 16px; margin-bottom: 16px;"
            />
          </div>
        </a-flex>
      </div>

      <div v-if="project.miniGames && project.miniGames.length > 0" class="mini-games-section">
        <a-divider>小游戏列表</a-divider>
        <div class="mini-games-list">
          <a-popover
            v-for="game in project.miniGames"
            :key="game.code"
            :title="game.name"
            trigger="click"
            placement="bottom"
          >
            <template #content>
              <div class="qr-code-popover">
                <img :src="`/myProjSite/${game.code}.png`" :alt="game.name" class="qr-code-image" />
                <p class="qr-code-tip">扫码体验</p>
              </div>
            </template>
              <a-button class="mini-game-btn">
                <DribbbleOutlined />
                {{ game.name }}
              </a-button>
          </a-popover>
        </div>
        <a-divider style="font-size: x-small;">部分小游戏年久未维护，可能无法正常使用</a-divider>
      </div>

      <div class="project-links" v-if="project.github || project.link || project.demo">
        <a-divider>相关链接</a-divider>
        <a-space size="large">
          <a-button v-if="project.github" type="primary"  @click="openLink(project.github)">
            <GithubOutlined />
            GitHub
          </a-button>
          <a-button v-if="project.link" :href="project.link">
            <LinkOutlined />
            应用商店
          </a-button>
          <a-button v-if="project.demo" @click="openLink(project.demo)">
            <PlayCircleOutlined />
            演示视频
          </a-button>
        </a-space>
      </div>
    </a-card>

    <a-empty v-else description="项目不存在" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, h } from 'vue'
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();

// import {
//   ArrowLeftOutlined,
//   ThunderboltOutlined,
//   ReadOutlined,
//   StockOutlined,
//   BookOutlined,
//   CalendarOutlined,
//   TagOutlined,
//   StarOutlined,
//   GithubOutlined,
//   LinkOutlined,
//   PlayCircleOutlined
// } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.id as string)

const allProjects = {
  'book-edit': {
    id: 'book-edit',
    name: '无代码可视化编辑器',
    type: 'tool',
    role: '程序',
    date: '2024.04 - 2025.12',
    description: '本项目由我在项目中发现开发流程过于复杂繁琐，为优化项目进度，针对交互式程序制作可自由编辑的编辑器，让策划无需会写代码也能实现动态绘本的制作，同时本编辑工具也适用于其它游戏场景。',
    achievements: '将原本的开发难度降低，易用，降低了绘本的开发成本',
    tagColor: 'blue',
    github: 'https://github.com/HelloMole/bookEdit',
    previewImgs: [
      '/myProjSite/bookeditusege.png'
    ],
    details: `
      <h3>项目背景</h3>
      <p>在开发过程中发现交互式绘本的制作流程过于复杂，需要大量程序开发工作，导致开发成本高、周期长。</p>
      
      <h3>解决方案</h3>
      <p>开发了一个可视化编辑器，让非技术人员也能通过拖拽和配置的方式创建交互式内容。编辑器支持：</p>
      <ul>
        <li>可视化节点编辑</li>
        <li>丰富的交互组件库</li>
        <li>实时预览功能</li>
        <li>配置导出功能</li>
      </ul>
      
      <h3>技术亮点</h3>
      <ul>
        <li>基于 Electron 开发的桌面应用</li>
        <li>支持多平台运行</li>
        <li>可扩展的插件系统</li>
      </ul>
    `
  },
  'tata-read': {
    id: 'tata-read',
    name: '塔塔悦读',
    type: 'read',
    role: '开发',
    date: '2022.01 - 2025.11',
    description: '本游戏是一个面向儿童的游戏绘本，每本绘本都是以可以交互的小游戏来呈现。通过游戏化的方式激发儿童的阅读兴趣，让学习变得更有趣。',
    achievements: '已上架iOS 安卓等应用平台，获得用户好评',
    tagColor: 'blue',
    link: 'https://apps.apple.com/cn/app/%E5%A1%94%E5%A1%94%E6%82%A6%E8%AF%BB/id1589596097',
    details: `
      <h3>项目特点</h3>
      <p>这是一款专为儿童设计的交互式绘本应用，每本绘本都包含了多个可交互的小游戏。</p>
      
      <h3>主要功能</h3>
      <ul>
        <li>丰富的绘本内容库</li>
        <li>交互式游戏玩法</li>
        <li>适配iOS和Android平台</li>
        <li>适合儿童使用的界面设计</li>
      </ul>
      
      <h3>技术实现</h3>
      <ul>
        <li>使用 Cocos Creator 开发</li>
        <li>跨平台打包部署</li>
        <li>SDK 集成与对接</li>
      </ul>
    `
  },
  'stock-backtest': {
    id: 'stock-backtest',
    name: '炒股策略回测系统',
    type: 'finance',
    role: '开发',
    date: '2024.10 - 2025.07',
    description: '本项目由本人业余时间开发，为满足对股市策略的分析，开发的回测系统，支持自由编写策略，导入股市数据，并测试指定期间内的策略收益，并可衍生到实盘模拟交易。',
    achievements: '可以实现稳定准确的策略测试结果，编辑保存等操作',
    tagColor: 'blue',
    demo: 'https://meeting.tencent.com/crm/2BjZxEy4c0',
    previewImgs: [
      '/myProjSite/gushi1.png',
      '/myProjSite/gushi2.png',
    ],
    details: `
      <h3>项目目标</h3>
      <p>开发一个完整的股票策略回测系统，帮助投资者验证交易策略的有效性。</p>
      
      <h3>核心功能</h3>
      <ul>
        <li>策略编写与编辑</li>
        <li>历史数据导入</li>
        <li>回测执行与分析</li>
        <li>收益计算与可视化</li>
        <li>策略保存与管理</li>
        <li>模拟交易功能</li>
      </ul>
      
      <h3>技术栈</h3>
      <ul>
        <li>前端：Vue 3 + TypeScript</li>
        <li>数据处理：支持多种数据格式导入</li>
        <li>计算引擎：使用Electron ipc调用 + Worker实现多线程回测</li>
      </ul>
    `
  },
  'music-tree': {
    id: 'music-tree',
    name: '音乐树儿童音乐教育软件',
    type: 'education',
    role: '开发',
    date: '2019.08 - 2020.05',
    description: '针对b端客户开发用于幼儿园上课的软件，针对c端上架了ios和安卓客户端版本。通过互动式的教学方式，让儿童在游戏中学习音乐知识。',
    achievements: '完成B端和C端产品的开发与上线',
    tagColor: 'blue',
    link: 'https://apps.apple.com/cn/app/音乐树/id1456222379',
    details: `
      <h3>项目概述</h3>
      <p>一款面向儿童的音乐教育软件，提供B端（幼儿园）和C端（个人用户）两个版本。</p>
      
      <h3>B端功能</h3>
      <ul>
        <li>课堂互动教学</li>
        <li>课程管理系统</li>
        <li>学生进度跟踪</li>
      </ul>
      
      <h3>C端功能</h3>
      <ul>
        <li>个人学习模式</li>
        <li>趣味音乐游戏</li>
        <li>学习进度记录</li>
      </ul>
      
      <h3>平台支持</h3>
      <ul>
        <li>iOS App Store</li>
        <li>Android 应用市场</li>
        <li>Web 管理后台</li>
      </ul>
    `
  },
  'wx-game': {
    id: 'wx-game',
    name: '微信小游戏',
    type: 'game',
    role: '开发',
    date: '2018 - 2019(大学期间)',
    description: '独立开发了多款微信小游戏并上线，包含射击类，益智类等休闲游戏',
    achievements: '开通广告主实现盈利，累计用户超5万',
    tagColor: 'blue',
    details: ``,
    miniGames: [
      {
        code: 'foxitoulan',
        name: '佛系投篮',
        description: '一个休闲的投篮小游戏'
      },
      {
        code: 'miniroom',
        name: '小小房间',
        description: '一个休闲的解谜游戏，引导小人逃出房间'
      },
      {
        code: 'kajiqietu',
        name: '咔叽切图',
        description: '一个创建微信朋友圈九宫格切图的小工具'
      },
      {
        code: 'xiaomianfangkuai',
        name: '消灭方块球',
        description: '方块球不停出现，来挑战看看能坚持多久吧'
      },
      {
        code: 'herohelpme',
        name: 'Hero快来救我',
        description: '射击弓箭解救小鸟吧'
      },
      {
        code: 'MOLEReturn',
        name: 'MOLE回归',
        description: '一个插画风格的叙事游戏'
      }
    ]
  }
}

const project = computed(() => allProjects[projectId.value])

const getProjectTypeName = (type: string) => {
  const typeMap: Record<string, string> = {
    tool: '工具类',
    game: '游戏类',
    finance: '金融类',
    education: '教育类'
  }
  return typeMap[type] || '其他'
}

const goBack = () => {
  router.push('/')
}

const openLink = (url: string) => {
  window.open(url)
}
</script>

<style scoped>
.project-detail-container {
  /* max-width: 1000px; */
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
}

.detail-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.project-icon {
  font-size: 20px;
  color: #1890ff;
}


.project-description {
  font-size: 15px;
  line-height: 1.8;
  /* color: #595959; */
  margin: 16px 0;
}

.project-description p {
  margin: 0;
}

.project-achievements {
  margin: 16px 0;
}

.project-details {
  margin: 24px 0;
}

.project-details h3 {
  /* color: #262626; */
  margin-top: 16px;
  margin-bottom: 8px;
}

.project-details ul {
  margin: 12px 0;
  padding-left: 24px;
}

.project-details li {
  margin: 8px 0;
  line-height: 1.6;
  /* color: #595959; */
}

.mini-games-section {
  margin-top: 24px;
}

.mini-games-list {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
}

.mini-game-btn {
  /* text-align: left; */
  /* height: auto;
  padding: 8px 0;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px; */
  /* width: auto; */
}

.mini-game-btn:hover {
  /* color: #1890ff; */
}

.qr-code-popover {
  text-align: center;
  padding: 8px;
}

.qr-code-image {
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
}

.qr-code-tip {
  margin: 12px 0 0 0;
  color: #8c8c8c;
  font-size: 13px;
}

.project-links {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

@media (max-width: 768px) {
  .project-detail-container {
    padding: 16px;
  }

  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-header h1 {
    font-size: 24px;
  }
}
</style>
