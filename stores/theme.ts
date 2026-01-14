import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false as boolean,
    hasManualToggle: false as boolean
  }),
  
  actions: {
    initDarkMode() {
      if (process.client) {
        // 从 localStorage 恢复手动切换状态
        const savedTheme = localStorage.getItem('theme-dark-mode')
        const savedManualToggle = localStorage.getItem('theme-manual-toggle')
        
        if (savedTheme !== null && savedManualToggle === 'true') {
          // 如果之前有手动切换，恢复保存的主题
          this.isDarkMode = savedTheme === 'true'
          this.hasManualToggle = true
        } else {
          // 否则跟随系统主题
          this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          this.hasManualToggle = false
        }
        
        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
          // 只有在用户没有手动切换时才跟随系统
          if (!this.hasManualToggle) {
            this.isDarkMode = event.matches
          }
        })
      }
    },
    
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.hasManualToggle = true
      // 保存到 localStorage
      if (process.client) {
        localStorage.setItem('theme-dark-mode', String(this.isDarkMode))
        localStorage.setItem('theme-manual-toggle', 'true')
      }
    },
    
    setDarkMode(value: boolean) {
      this.isDarkMode = value
      this.hasManualToggle = true
      // 保存到 localStorage
      if (process.client) {
        localStorage.setItem('theme-dark-mode', String(this.isDarkMode))
        localStorage.setItem('theme-manual-toggle', 'true')
      }
    }
  }
})

