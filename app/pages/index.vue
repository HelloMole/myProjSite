<template>
  <div class="home-container" :style="{ background: token.colorBgLayout }">
    <a-row :gutter="[24, 24]">
      <!-- 个人信息卡片 -->
      <a-col :xs="24" :md="8">
        <a-card class="info-card" :bordered="false">
          <template #cover>
            <div class="avatar-container">
              <a-avatar :size="120" class="avatar" src="/myProjSite/logo.jpg">
                <!-- <template #icon>
                  <UserOutlined />
                </template> -->
              </a-avatar>
            </div>
          </template>
          <a-card-meta>
            <template #title>
              <h1 class="name">李耀威</h1>
            </template>
            <template #description>
              <div class="personal-info">
                <div class="info-item">
                  <IdcardOutlined />
                  <span>男 | 27岁</span>
                </div>
                <div class="info-item">
                  <PhoneOutlined />
                  <span>17621492349</span>
                </div>
                <div class="info-item">
                  <MailOutlined />
                  <span>648925074@qq.com</span>
                </div>
                <div class="info-item">
                  <EnvironmentOutlined />
                  <span>期望城市：上海</span>
                </div>
                <div class="info-item">
                  <DollarOutlined />
                  <span>期望薪资：18-25K</span>
                </div>
                <div class="info-item highlight">
                  <CrownOutlined />
                  <span>6年工作经验 | 全栈工程师 | 前端开发</span>
                </div>
              </div>
            </template>
          </a-card-meta>
        </a-card>

        <!-- 个人优势卡片 -->
        <a-card title="个人优势" class="advantage-card" style="margin-top: 24px;" :bordered="false">
          <ul class="advantage-list">
            <li>能力丰富，策划类、测试类、工具研发类的岗位都可以做</li>
            <li>经验丰富，熟练掌握前端各类技术栈（Vue，js/ts，electron，java，ios安卓等）</li>
            <li>熟悉游戏引擎（Cocos Creator，Unity）和游戏开发流程</li>
            <li>可使用AI工具辅助工作流，熟练使用Cursor编程</li>
            <li>独立开发过微信小游戏，对游戏机制有深入探索</li>
            <li>真诚可靠，言行一致，认真负责</li>
          </ul>
        </a-card>

        <!-- 技能标签 -->
        <a-card title="技术栈" class="skill-card" style="margin-top: 24px;" :bordered="false">
          <div class="skill-tags">
            <a-tag color="blue">Vue3</a-tag>
            <a-tag color="cyan">TypeScript</a-tag>
            <a-tag color="geekblue">JavaScript</a-tag>
            <!-- <a-tag color="purple">Nuxt</a-tag> -->
            <a-tag color="magenta">Electron</a-tag>
            <a-tag color="orange">Node.js</a-tag>
            <a-tag color="gold">Java</a-tag>
            <a-tag color="purple">Cocos Creator</a-tag>
            <a-tag color="green">Unity</a-tag>
            <a-tag color="volcano">iOS/Android</a-tag>
          </div>
        </a-card>
      </a-col>

      <!-- 主要内容区域 -->
      <a-col :xs="24" :md="16">
        <!-- 工作经历 -->
        <a-card title="工作经历" class="experience-card" :bordered="false">
          <a-timeline>
            <a-timeline-item color="blue">
              <div class="experience-item">
                <h3>全栈工程师</h3>
                <div class="company">上海谷颐信息科技有限公司</div>
                <div class="duration">2022.02 - 2025.12</div>
                <div class="description">主要负责所有程序前端后端，cocos游戏开发，后端维护</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="experience-item">
                <h3>Cocos 开发工程师</h3>
                <div class="company">上海起凡数字技术有限公司</div>
                <div class="duration">2020.02 - 2022.01</div>
                <div class="description">负责游戏前端的开发，负责打包ios，安卓版本，以及sdk对接等工作</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="orange">
              <div class="experience-item">
                <h3>前端开发工程师</h3>
                <div class="company">牧野教育科技（上海）有限公司</div>
                <div class="duration">2019.08 - 2020.01</div>
                <div class="description">负责交互式乐理课程的程序化制作，开发各个平台的版本</div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-card>

        <!-- 项目经历 -->
        <a-card title="项目经历" class="project-card" style="margin-top: 24px;" :bordered="false">
          <a-row :gutter="[16, 16]">
            <a-col :xs="24" :sm="12" v-for="project in projects" :key="project.id">
              <a-card
                class="project-item-card"
                hoverable
                @click="goToProject(project)"
              >
                <template #title>
                  <div class="project-title">
                    <ThunderboltOutlined v-if="project.type === 'tool'" />
                    <ReadOutlined  v-if="project.type === 'read'" />
                    <StockOutlined v-if="project.type === 'finance'" />
                    <BookOutlined v-if="project.type === 'education'" />
                    <Gameicon  v-if="project.type === 'game'" />
                    <span>{{ project.name }}</span>
                  </div>
                </template>
                <template #extra>
                  <!-- <a-tag :color="project.tagColor">{{ project.role }}</a-tag> -->
                   <!-- <a href="#">></a> -->
                    <RightOutlined />
                </template>
                <div class="project-content">
                  <div class="project-date">
                    <CalendarOutlined />
                    <span>{{ project.date }}</span>
                  </div>
                  <p class="project-desc">{{ project.description }}</p>
                  <div class="project-achievements" v-if="project.achievements">
                    <StarOutlined />
                    <span>{{ project.achievements }}</span>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </a-card>

        <!-- 教育经历 -->
        <a-card title="教育经历" class="education-card" style="margin-top: 24px;" :bordered="false">
          <div class="education-item">
            <h3>上饶师范学院</h3>
            <div class="major">数学与应用数学 | 本科</div>
            <div class="duration">2015 - 2019</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <moon />
  </div>
</template>

<script lang="ts" setup>
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();

const router = useRouter()

const projects = ref([
  {
    id: 'battle-of-balls',
    name: '复刻球球大作战官网页面',
    type: 'game',
    role: '程序',
    date: '2026.01.15',
    description: '使用Cursor辅助编程一天时间复刻球球大作战官网页面（pc端）',
    achievements: '点击查看页面，该页面仅为练习作品，与球球大作战官方无关',
    tagColor: 'blue',
    pagePath: '/battleofballs'
  },
  {
    id: 'book-edit',
    name: '无代码可视化编辑器',
    type: 'tool',
    role: '程序',
    date: '2024.04 - 2025.12',
    description: '针对交互式程序制作可自由编辑的编辑器，让策划无需会写代码也能实现动态绘本的制作',
    achievements: '将原本的开发难度降低，易用，降低了绘本的开发成本',
    tagColor: 'blue',
    github: 'https://github.com/HelloMole/bookEdit'
  },
  {
    id: 'tata-read',
    name: '塔塔悦读',
    type: 'read',
    role: '程序',
    date: '2022.01 - 2025.11',
    description: '面向儿童的游戏绘本，每本绘本都是以可以交互的小游戏来呈现',
    achievements: '已上架iOS 安卓等应用平台',
    tagColor: 'blue',
    link: 'https://apps.apple.com/cn/app/%E5%A1%94%E5%A1%94%E6%82%A6%E8%AF%BB/id1589596097'
  },
  {
    id: 'stock-backtest',
    name: '炒股策略回测系统',
    type: 'finance',
    role: '程序',
    date: '2024.10 - 2025.07',
    description: '为满足对股市策略的分析，开发的回测系统，支持自由编写策略，导入股市数据，并测试指定期间内的策略收益',
    achievements: '可以实现稳定准确的策略测试结果，编辑保存等操作',
    tagColor: 'blue',
    demo: 'https://meeting.tencent.com/crm/2BjZxEy4c0'
  },
  {
    id: 'music-tree',
    name: '音乐树儿童音乐教育软件',
    type: 'education',
    role: '程序',
    date: '2019.08 - 2020.05',
    description: '针对b端客户开发用于幼儿园上课的软件，针对c端上架了ios和安卓客户端版本',
    achievements: '完成B端和C端产品的开发与上线',
    tagColor: 'blue'
  },
  {
    id: 'wx-game',
    name: '微信小游戏',
    type: 'game',
    role: '程序',
    date: '2018 - 2019（大学期间）',
    description: '独立开发了多款微信小游戏并上线，包含射击类，益智类等休闲游戏',
    achievements: '开通广告主实现盈利，累计用户超5万',
    tagColor: 'blue'
  },
])

const goToProject = (project: any) => {
  if(project.pagePath) {
    router.push(project.pagePath)
  }else{
    router.push(`/project/detail_${project.id}`)
  }
}
</script>

<style scoped>
.home-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 24px;
  /* background: #f5f5f5; */
  min-height: 100vh;
}

.info-card {
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.avatar-container {
  padding: 24px;
  background: linear-gradient(135deg, #0f2d6a 0%, #abcaff 100%);
}

.avatar {
  /* background: #fff; */
  color: #667eea;
  font-size: 48px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 16px 0;
  /* color: #262626; */
}

.personal-info {
  text-align: left;
  margin-top: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  /* color: #595959; */
  font-size: 14px;
}

.info-item.highlight {
  color: #1890ff;
  font-weight: 500;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.advantage-card,
.skill-card,
.experience-card,
.project-card,
.education-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.advantage-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advantage-list li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  /* color: #595959; */
  line-height: 1.8;
}

.advantage-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #52c41a;
  font-weight: bold;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.experience-item h3 {
  margin: 0 0 8px 0;
  /* color: #262626; */
  font-size: 16px;
}

.company {
  font-size: 15px;
  font-weight: 500;
  color: #1890ff;
  margin-bottom: 4px;
}

.duration {
  /* color: #8c8c8c; */
  font-size: 13px;
  margin-bottom: 8px;
}

.description {
  /* color: #595959; */
  line-height: 1.6;
  margin-top: 8px;
}

.project-item-card {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 8px;
  height: 100%;
}

.project-item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.project-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
}

.project-content {
  margin-top: 12px;
}

.project-date {
  display: flex;
  align-items: center;
  gap: 6px;
  /* color: #8c8c8c; */
  font-size: 13px;
  margin-bottom: 12px;
}

.project-desc {
  /* color: #595959; */
  line-height: 1.6;
  margin: 12px 0;
  min-height: 48px;
}

.project-achievements {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #faad14;
  font-size: 13px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.education-item h3 {
  margin: 0 0 8px 0;
  /* color: #262626; */
  font-size: 16px;
}

.major {
  font-size: 15px;
  /* color: #595959; */
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }

  .name {
    font-size: 24px;
  }
}
</style>