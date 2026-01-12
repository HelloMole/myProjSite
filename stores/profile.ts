import { defineStore } from 'pinia'

export interface Project {
  id: string
  title: string
  role: string
  period: string
  description: string
  achievements: string
  link?: string
  demoLink?: string
}

export interface WorkExperience {
  company: string
  position: string
  period: string
  description: string
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    personalInfo: {
      name: 'Yawei Li',
      gender: '男',
      age: 27,
      phone: '微信号：Xinzisuoyu',
      email: '648925074@qq.com',
      experience: '6年工作经验',
      position: '程序员',
      expectedSalary: '18-25K',
      expectedCity: '上海'
    },
    advantages: [
      '能力丰富，策划类、测试类、工具研发类的岗位都可以做。',
      '经验丰富，熟练掌握前端各类技术栈，Vue，js/ts，electron，java，ios安卓等常见应用开发均可，如单人开发项目，后端可用Nodejs辅助开发，熟练运用Ai工具辅助工作流，可使用Cursor编程。',
      '参与过多款游戏的程序开发，熟悉cocos creator，Unity等游戏引擎，对项目进度能把控，写策划也能考虑到程序的逻辑是否合理，能与程序更好的沟通策划案。甚至可以在时间允许的情况下自行开发效率工具，游戏引擎插件，Excel表转换游戏配置表等等。',
      '读大学时独立开发过四五款微信小游戏（但是都没火）',
      '热爱游戏以及对游戏机制的探索，个人比较喜欢玩法有趣的游戏，或者开放世界类的游戏，平时玩switch游戏，主机游戏比较多，但不沉迷游戏，主要是以了解玩法实现等方案去玩。',
      '真诚可靠，言行一致，认真负责'
    ],
    workExperiences: [
      {
        company: '上海谷颐信息科技有限公司',
        position: '全栈工程师',
        period: '2022.02-2025.12',
        description: '主要负责所有程序前端后端，cocos游戏开发，后端维护'
      },
      {
        company: '上海起凡数字技术有限公司',
        position: 'Cocos',
        period: '2020.02-2022.01',
        description: '负责游戏前端的开发，负责打包ios，安卓版本，以及sdk对接等工作'
      },
      {
        company: '牧野教育科技（上海）有限公司',
        position: '前端开发工程师',
        period: '2019.08-2020.01',
        description: '负责交互式乐理课程的程序化制作，开发各个平台的版本'
      }
    ],
    projects: [
      {
        id: 'book-edit',
        title: '无代码可视化编辑器',
        role: '程序',
        period: '2024.04-2025.12',
        description: '本项目由我在项目中发现开发流程过于复杂繁琐，为优化项目进度，针对交互式程序制作可自由编辑的编辑器，让策划无需会写代码也能实现动态绘本的制作，同时本编辑工具也适用于其它游戏场景',
        achievements: '将原本的开发难度降低，易用，降低了绘本的开发成本',
        link: 'https://github.com/HelloMole/bookEdit'
      },
      {
        id: 'tata-read',
        title: '塔塔悦读',
        role: '开发',
        period: '2022.01-2025.11',
        description: '本游戏是一个面向儿童的游戏绘本，每本绘本都是以可以交互的小游戏来呈现。',
        achievements: '已上架iOS 安卓等应用平台',
        link: 'https://apps.apple.com/cn/app/塔塔悦读/id1589596097'
      },
      {
        id: 'stock-backtest',
        title: '炒股策略回测系统',
        role: '开发',
        period: '2024.10-2025.07',
        description: '本项目由本人业余时间开发，为满足对股市策略的分析，开发的回测系统，支持自由编写策略，导入股市数据，并测试指定期间内的策略收益，并可衍生到实盘模拟交易',
        achievements: '可以实现稳定准确的策略测试结果，编辑保存等操作',
        demoLink: 'https://meeting.tencent.com/crm/2BjZxEy4c0'
      },
      {
        id: 'music-tree',
        title: '音乐树儿童音乐教育软件',
        role: '开发',
        period: '2019.08-2020.05',
        description: '针对b端客户开发用于幼儿园上课的软件，针对c端上架了ios和安卓客户端版本',
        achievements: '成功开发并上架多平台版本',
        link: 'https://apps.apple.com/cn/app/音乐树/id1456222379'
      }
    ],
    education: {
      school: '上饶师范学院',
      degree: '本科',
      major: '数学与应用数学',
      period: '2015-2019'
    }
  }),
  
  getters: {
    getProjectById: (state) => {
      return (id: string) => state.projects.find(project => project.id === id)
    }
  }
})